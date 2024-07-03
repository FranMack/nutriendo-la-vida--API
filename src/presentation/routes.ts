import { Router } from "express";
import { AuthRoutes,ProductRoutes } from "./routes/";


export class AppRoutes{

    static get routes():Router{
        const router=Router()

        //aca van todas las rutas
        router.use("/auth",AuthRoutes.routes)
        router.use("/product",ProductRoutes.routes)


        return router

    }


}