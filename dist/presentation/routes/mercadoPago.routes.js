"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercadoPagoRoutes = void 0;
const express_1 = require("express");
const mercadoPago_controllers_1 = require("../controllers/mercadoPago.controllers");
class MercadoPagoRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        //definir las rutas de auth
        router.post("/create-order", mercadoPago_controllers_1.MercadoPagoControllers.createOrder);
        router.post("/webhook", mercadoPago_controllers_1.MercadoPagoControllers.reciveWebhook);
        return router;
    }
}
exports.MercadoPagoRoutes = MercadoPagoRoutes;
