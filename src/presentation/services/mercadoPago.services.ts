import MercadoPagoConfig, { Payment, Preference } from "mercadopago";
import { envs } from "../../config";
import { BuyersHistorynModel } from "../../data/Mongo/Models";
import { SalesHistorynModel } from "../../data/Mongo/Models/salesHistory";
import { CustomError } from "../../domain/errors/custom.errors";
import { TemporaryTransactionModel } from "../../data/Mongo/Models/temporaryTransaction";
import { v4 as uuidv4 } from "uuid";
import { EmailService } from "./email.services";
import { MailTemplate, AdminMailTemplate } from "../../helpers/mailTemplate";

interface BuyerInfo {
  name: string;
  lastname: string;
  email: string;
  phone: string | null | undefined;
}

interface ItemInfo {
  title: string;
  quantity: number;
  unit_price: number;
  currency: string;
  id: string;
  consult?:boolean
}

export class MercadoPagoServices {
  static async createOrder(buyerInfo: BuyerInfo, items: ItemInfo[]) {
    try {
      const client = new MercadoPagoConfig({
        accessToken: envs.MERCADO_PAGO_TOKEN,
      });
      const preference = new Preference(client);

      const customPreferenceId = uuidv4();

      const newPreference = await preference.create({
        body: {
          items: items,
          payer: {
            email: buyerInfo.email,
          },

          back_urls: {
            success: `${envs.FRONT_URL}`,
            failure: `${envs.API_DOMAIN}/api/payment-mercadopago/failure`,
            pending: `${envs.API_DOMAIN}/api/payment-mercadopago/pending`,
          },
          //se vence al par de dias/ dia, hay que generarlo con ngrok, hasta que tengamos el dominio
          notification_url: `${envs.API_DOMAIN}/api/payment-mercadopago/webhook/?buyer_email=${buyerInfo.email}&buyer_name=${buyerInfo.name}&buyer_lastname=${buyerInfo.lastname}&buyer_phone=${buyerInfo.phone}&preference_id=${customPreferenceId}`,
        },
      });

      await TemporaryTransactionModel.create({
        preferenceId: customPreferenceId,
        buyerInfo,
        itemsInfo: items,
      });

      return newPreference;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async reciveWebhook(paymentQuery: any) {
    try {
      if (paymentQuery.type === "payment") {
        const email = paymentQuery.buyer_email;
        const name = paymentQuery.buyer_name;
        const lastname = paymentQuery.buyer_lastname;
        const phone = paymentQuery.buyer_phone;
        const client = new MercadoPagoConfig({
          accessToken: envs.MERCADO_PAGO_TOKEN,
        });
        const payment = new Payment(client);

        const paymentData = await payment.get({ id: paymentQuery["data.id"] });
        const payment_id = paymentData.id;
        const temporaryTransaction = await TemporaryTransactionModel.findOne({
          preferenceId: paymentQuery["preference_id"],
        });

        if (!temporaryTransaction) {
          throw CustomError.badRequest("Transaction not found");
        }

        const status = paymentData.status;
        const buyerInfo = temporaryTransaction.buyerInfo!;
        const itemsInfo = temporaryTransaction.itemsInfo!;

        if (status === "approved") {
          let buyer = await BuyersHistorynModel.findOne({ email: email });

          if (!buyer) {
            buyer = await BuyersHistorynModel.create(buyerInfo);
          }

          const buyerId = buyer.id;
          const promises = itemsInfo.map((item) =>
            SalesHistorynModel.create({
              payment_id: payment_id,
              product: item.title,
              price: item.unit_price,
              consult:item.consult,
              buyerId: buyerId,
            })
          );

          await Promise.all(promises);

          const title = `Tu compra ha sido realizada con exito`;
          const shopingCartItems = temporaryTransaction.itemsInfo.map(
            (item) => {
              if(item.consult){
                return `${item.title} (+ Consulta)`
              }
              else{
                return item.title
              }
            }
          );

          const sendBook = shopingCartItems.includes(
            "Ebook: Preparate 1 día y come toda la semana"
          )
            ? true
            : false;

          const sendForm = shopingCartItems.find((item) => {
            if (!item.includes("Ebook")) {
              return item;
            }
          })?.length
            ? true
            : false;

          const linksForm = [
            {
              title: "Cómo crear buenos hábitos alimenticios",
              link: "https://docs.google.com/forms/d/1MlSBFpvfIPPfDjhLi_3HmEmXLhojfaUkiQ6_x6pyV-0/viewform?edit_requested=true",
            },
            {
              title: "Alimentación en pre y post menopausia",
              link: "https://docs.google.com/forms/d/1MuTFqftB6QF63TDeeTQEszraHbt1-EX0lwXLRyIUKMQ/viewform?edit_requested=true",
            },
            {
              title: "Baja de peso sin culpa ni restricciones",
              link: "https://docs.google.com/forms/d/1iSE7qS2uglarApfGSZSs-N3feQet_NX-_uXDmXMddPE/viewform?edit_requested=true",
            },
            {
              title: "Alimentación y rendimiento deportivo",
              link: "https://docs.google.com/forms/d/18cS6OZpbyUjlrRcPfGlfmIBNTUxAqlaLHhQtZdk7dtY/viewform?edit_requested=true",
            },
          ];

          const linksEbook = [
            {
              title: "Ebook: Preparate 1 día y come toda la semana",
              link: "https://drive.google.com/uc?export=download&id=1IKrhzIsopd9evSd87r7l4g9iE9pFQE1j",
            },
            {
              title: "Recetario: Desayunos y meriendas",
              link: "https://drive.google.com/uc?export=download&id=1k6-dvJbeF5o2fGgvpguhugoeqmy9Vn29",
            },
            {
              title: "Ebook:Compras",
              link: "https://drive.google.com/uc?export=download&id=1UMNSfiXumbfQxNb15GhsekmjhOwbadDN",
            },
          ];

          
          const forms = linksForm.filter((item) => {
            return shopingCartItems.some((item2) => item2.includes(item.title));
        });
          
          const ebook = sendBook ? linksEbook : [];

          const content1 = [
            "Quiero darte las gracias por tu reciente compra.",
            "Valoro mucho tu confianza en mí y estoy encantada de que me hayas elegido para comenzar tu cambio.",
            "Luego de que tu formulario esté completo, trabajaré en tu plan alimentario para que esté adaptado 100% a vos.",
            "En las proximas 48hs recivirás tu plan nutricional personalizado.",
            "En caso de que tambien hayas solicitado una consulta profesional, me estaré comunicando contigo en la brevedad para coordinar la cita.",
            "Si tienes alguna pregunta o necesitas información sobre tu plan, no dudes en contactarme.",
            "Estoy aquí para ayudarte.",
          ];

          const content2 = [
            "Quiero darte las gracias por tu reciente compra. Valoro mucho tu confianza en mí y estoy encantada de que me hayas elegido para comenzar tu cambio.",
            "En el ebook encontrarás una planificación semanal de comidas, con su lista de compras y como organizarte para poder lograrlo de una manera fácil y sencilla.",
          ];

          const content = sendForm ? content1 : content2;

          const htmlBody = MailTemplate({
            name: name,
            plans: shopingCartItems,
            title,
            content,
            links: forms,
            ebookLinks: ebook,
          });
          const htmlBodyAdmin = AdminMailTemplate({
            name,
            lastname,
            plans: shopingCartItems,
            email,
            phone,
          });

          const mailSubject= sendForm ? "Plan nutricional" :"Ebook: Preparate 1 día y come toda la semana"

          const sendEmailPromises = [
            await EmailService.sendEmail({
              to: email,
              subject: "Plan nutricional",
              htmlBody,
            }),
            await EmailService.sendEmail({
              to: "nutriendolavida.app@gmail.com",
              subject: "Nueva venta",
              htmlBody: htmlBodyAdmin,
            }),
          ];

          await Promise.all(sendEmailPromises);

          return buyer;
        } else {
          throw CustomError.internalServer("Payment not approved");
        }
      }
    } catch (error) {
      console.error("Error processing webhook:", error);
      throw error;
    }
  }
}
