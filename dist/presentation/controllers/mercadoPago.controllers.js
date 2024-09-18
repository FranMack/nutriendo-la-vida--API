"use strict";
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
exports.MercadoPagoControllers = void 0;
const custom_errors_1 = require("../../domain/errors/custom.errors");
const mercadoPago_services_1 = require("../services/mercadoPago.services");
class MercadoPagoControllers {
    static createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { buyerInfo, items } = req.body;
                const newPreference = yield mercadoPago_services_1.MercadoPagoServices.createOrder(buyerInfo, items);
                if (newPreference) {
                    res.status(200).json({ link_de_pago: newPreference.init_point });
                }
                else {
                    throw new Error("Error en el pago");
                }
            }
            catch (error) {
                if (error instanceof custom_errors_1.CustomError) {
                    return res.status(error.statusCode).json({ error: error.message });
                }
                if (error instanceof Error) {
                    return res.status(500).json({ error: error.message });
                }
                return res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    static reciveWebhook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentQuery = req.query;
            try {
                const payment_id = yield mercadoPago_services_1.MercadoPagoServices.reciveWebhook(paymentQuery);
                res.status(200).json({
                    message: `Your payment has been credited correctly your payment id is ${payment_id}`,
                });
            }
            catch (error) {
                if (error instanceof custom_errors_1.CustomError) {
                    return res.status(error.statusCode).json({ error: error.message });
                }
                if (error instanceof Error) {
                    return res.status(500).json({ error: error.message });
                }
                return res.status(500).json({ error: "Internal server error" });
            }
        });
    }
}
exports.MercadoPagoControllers = MercadoPagoControllers;
