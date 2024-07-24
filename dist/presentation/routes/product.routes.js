"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const product_controllers_1 = require("../controllers/product.controllers");
const midlewares_1 = require("../midlewares");
class ProductRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        //definir las rutas de auth
        router.post("/create", midlewares_1.validateAdminAuth, product_controllers_1.ProductControllers.createProduct);
        router.patch("/edit", midlewares_1.validateAdminAuth, product_controllers_1.ProductControllers.editProduct);
        router.get("/list", product_controllers_1.ProductControllers.productList);
        return router;
    }
}
exports.ProductRoutes = ProductRoutes;
