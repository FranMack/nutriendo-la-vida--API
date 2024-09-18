"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const routes_1 = require("./routes/");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        //aca van todas las rutas
        router.use("/auth", routes_1.AuthRoutes.routes);
        router.use("/product", routes_1.ProductRoutes.routes);
        router.use("/payment-mercadopago", routes_1.MercadoPagoRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
