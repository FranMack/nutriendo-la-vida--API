import { Router } from "express";

import { validateAuth } from "../midlewares";
import { MercadoPagoControllers } from "../controllers/mercadoPago.controllers";



export class MercadoPagoRoutes{

    static get routes():Router{
        const router=Router()

        //definir las rutas de auth

        router.post("/create-order",MercadoPagoControllers.createOrder)
        router.post("/webhook",MercadoPagoControllers.reciveWebhook)



        


        return router

    }
}