import MercadoPagoConfig, { Payment, Preference } from "mercadopago";
import { envs } from "../../config";
import { BuyersHistorynModel } from "../../data/Mongo/Models";
import { SalesHistorynModel } from "../../data/Mongo/Models/salesHistory";
import { CustomError } from "../../domain/errors/custom.errors";
import { TemporaryTransactionModel } from "../../data/Mongo/Models/temporaryTransaction";
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from "./email.services";
import { env } from "process";
import { MailTemplate } from "../../helpers/mailTemplate";

interface BuyerInfo {
  name: string;
  lastname: string;
  email: string;
  phone: string |null| undefined;
}

interface ItemInfo {
  title: string;
  quantity: number;
  unit_price: number;
  currency: string;
  id:string
}

export class MercadoPagoServices {


  static async createOrder(buyerInfo: BuyerInfo, items: ItemInfo[]) {
    try {
      const client = new MercadoPagoConfig({
        accessToken: envs.MERCADO_PAGO_TOKEN,
      });
      const preference = new Preference(client);
   
      const customPreferenceId=uuidv4();

      const newPreference = await preference.create({
        body: {
          items:items,
          payer: {
            email: buyerInfo.email,
          },

          back_urls: {
            success: `${envs.FRONT_URL}`,
            failure: `${envs.API_DOMAIN}/api/payment-mercadopago/failure`,
            pending: `${envs.API_DOMAIN}/api/payment-mercadopago/pending`,
          },
          //se vence al par de dias/ dia, hay que generarlo con ngrok, hasta que tengamos el dominio
          notification_url: `${envs.API_DOMAIN}/api/payment-mercadopago/webhook/?buyer_email=${buyerInfo.email}&buyer_name=${buyerInfo.name}&buyer_lastname=${buyerInfo.lastname}&preference_id=${customPreferenceId}`,
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
      throw error
    }
  }

  static async reciveWebhook(paymentQuery: any) {
    try {
      if (paymentQuery.type === "payment") {
        const email = paymentQuery.buyer_email;
        const name = paymentQuery.buyer_name;
        const lastname = paymentQuery.buyer_lastname;
        const client = new MercadoPagoConfig({ accessToken: envs.MERCADO_PAGO_TOKEN });
        const payment = new Payment(client);
  
        const paymentData = await payment.get({ id: paymentQuery["data.id"] });
        const payment_id = paymentData.id;
        const temporaryTransaction= await TemporaryTransactionModel.findOne({preferenceId:paymentQuery["preference_id"] })

       
        if(!temporaryTransaction){
          throw CustomError.badRequest("Transaction not found");
        }


        const status = paymentData.status;
        const buyerInfo = temporaryTransaction.buyerInfo!
        const itemsInfo = temporaryTransaction.itemsInfo!
  
        if (status === "approved") {
          let buyer = await BuyersHistorynModel.findOne({email:email});
          
          if (!buyer) {
            buyer = await BuyersHistorynModel.create(buyerInfo);
          }
  
          const buyerId = buyer.id;
          const promises = itemsInfo.map(item => 
            SalesHistorynModel.create({
              payment_id:payment_id,
              product: item.title,
              price: item.unit_price,
              buyerId: buyerId,
            })
          );
  
          await Promise.all(promises);

          
          const title=`Tu compra ha sido realizada con exito.`
          const plans=temporaryTransaction.itemsInfo.map((item)=>{
            return(item.title)
          })
          const link="https://docs.google.com/forms/d/1iSE7qS2uglarApfGSZSs-N3feQet_NX-_uXDmXMddPE/viewform?edit_requested=true"
          const content="Para poder realizar un plan nutricional a medida de tus necesidades, es importante que completes el formulario que adjunto a continuación.\n En las proximas 48hs recibirás tu plan nutricional personalizado."
          
          const fullname=`${name} ${lastname}`

          const htmlBody=MailTemplate({name:fullname,plans,title,content,link})
          plans
      await EmailService.sendEmail({
        to:email,
        subject: "Plan nutricional",
        htmlBody,
      });


          return buyer;
        } else {
          throw CustomError.internalServer("Payment not approved");
        }
      }
    } catch (error) {
      console.error("Error processing webhook:", error);
      throw error
    }
  }
  
}
