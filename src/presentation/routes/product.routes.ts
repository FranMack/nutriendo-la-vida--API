import { Router } from "express";
import { ProductControllers } from "../controllers/product.controllers";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    //definir las rutas de auth

    router.post("/create", ProductControllers.createProduct);
    router.patch("/edit", ProductControllers.editProduct);
    router.get("/list", ProductControllers.productList);

    return router;
  }
}
