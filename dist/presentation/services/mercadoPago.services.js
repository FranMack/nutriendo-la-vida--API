"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercadoPagoServices = void 0;
const mercadopago_1 = __importStar(require("mercadopago"));
const config_1 = require("../../config");
const Models_1 = require("../../data/Mongo/Models");
const salesHistory_1 = require("../../data/Mongo/Models/salesHistory");
const custom_errors_1 = require("../../domain/errors/custom.errors");
const temporaryTransaction_1 = require("../../data/Mongo/Models/temporaryTransaction");
const uuid_1 = require("uuid");
const email_services_1 = require("./email.services");
class MercadoPagoServices {
    static createOrder(buyerInfo, items) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = new mercadopago_1.default({
                    accessToken: config_1.envs.MERCADO_PAGO_TOKEN,
                });
                const preference = new mercadopago_1.Preference(client);
                const customPreferenceId = (0, uuid_1.v4)();
                const newPreference = yield preference.create({
                    body: {
                        items: items,
                        payer: {
                            email: buyerInfo.email,
                        },
                        back_urls: {
                            success: `${config_1.envs.FRONT_URL}`,
                            failure: `${config_1.envs.API_DOMAIN}/api/payment-mercadopago/failure`,
                            pending: `${config_1.envs.API_DOMAIN}/api/payment-mercadopago/pending`,
                        },
                        //se vence al par de dias/ dia, hay que generarlo con ngrok, hasta que tengamos el dominio
                        notification_url: `${config_1.envs.API_DOMAIN}/api/payment-mercadopago/webhook/?email_acount=${buyerInfo.email}&preference_id=${customPreferenceId}`,
                    },
                });
                yield temporaryTransaction_1.TemporaryTransactionModel.create({
                    preferenceId: customPreferenceId,
                    buyerInfo,
                    itemsInfo: items,
                });
                return newPreference;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    static reciveWebhook(paymentQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (paymentQuery.type === "payment") {
                    const email = paymentQuery.email_acount;
                    const client = new mercadopago_1.default({ accessToken: config_1.envs.MERCADO_PAGO_TOKEN });
                    const payment = new mercadopago_1.Payment(client);
                    const paymentData = yield payment.get({ id: paymentQuery["data.id"] });
                    const payment_id = paymentData.id;
                    const temporaryTransaction = yield temporaryTransaction_1.TemporaryTransactionModel.findOne({ preferenceId: paymentQuery["preference_id"] });
                    if (!temporaryTransaction) {
                        throw custom_errors_1.CustomError.badRequest("Transaction not found");
                    }
                    const status = paymentData.status;
                    const buyerInfo = temporaryTransaction.buyerInfo;
                    const itemsInfo = temporaryTransaction.itemsInfo;
                    if (status === "approved") {
                        let buyer = yield Models_1.BuyersHistorynModel.findOne({ email: email });
                        if (!buyer) {
                            buyer = yield Models_1.BuyersHistorynModel.create(buyerInfo);
                        }
                        const buyerId = buyer.id;
                        const promises = itemsInfo.map(item => salesHistory_1.SalesHistorynModel.create({
                            payment_id: payment_id,
                            product: item.title,
                            price: item.unit_price,
                            buyerId: buyerId,
                        }));
                        yield Promise.all(promises);
                        const link = "https://docs.google.com/forms/d/1iSE7qS2uglarApfGSZSs-N3feQet_NX-_uXDmXMddPE/viewform?edit_requested=true";
                        const htmlBody = `
        
            <h1>Validate your Email</h1>
            <p>Estas a un paso de obtener tu plan nutricional, completa el formulario haciendo click en el siguiente enlace, esto me permitirá personalizar tu plan nutricional.</p>
            <a href="${link}">Formulario ${email}</a>
            <br/>
            <br/>
           <p> En las proximas 48hs estarás reciviendo un email con tu plan nutricional personalizado.</p>
            <br/>
            <br/>
            <p> Gracias por elegirnos</p>
            <br/>
            <br/>
            <p>Abril Sack</p>
            
            
            `;
                        yield email_services_1.EmailService.sendEmail({
                            to: email,
                            subject: "Plan nutricional",
                            htmlBody,
                        });
                        return buyer;
                    }
                    else {
                        throw custom_errors_1.CustomError.internalServer("Payment not approved");
                    }
                }
            }
            catch (error) {
                console.error("Error processing webhook:", error);
                throw error;
            }
        });
    }
}
exports.MercadoPagoServices = MercadoPagoServices;
