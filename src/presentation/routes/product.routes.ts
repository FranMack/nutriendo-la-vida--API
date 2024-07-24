import { Router } from "express";
import { ProductControllers } from "../controllers/product.controllers";
import { validateAdminAuth } from "../midlewares";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    //definir las rutas de auth

    router.post("/create", validateAdminAuth,ProductControllers.createProduct);
    router.patch("/edit",validateAdminAuth, ProductControllers.editProduct);
    router.get("/list", ProductControllers.productList);

    return router;
  }
}
