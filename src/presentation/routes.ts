import { Router } from "express";
import { AuthRoutes,ProductRoutes,MercadoPagoRoutes } from "./routes/";


export class AppRoutes{

    static get routes():Router{
        const router=Router()

        //aca van todas las rutas
        router.use("/auth",AuthRoutes.routes)
        router.use("/product",ProductRoutes.routes)
        router.use("/payment-mercadopago",MercadoPagoRoutes.routes)

       

        return router

    }


}