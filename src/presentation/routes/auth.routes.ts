import { Router } from "express";
import { AutControllers } from "../controllers/auth.controller";
import { validateAuth } from "../midlewares/auth.middleware";



export class AuthRoutes{

    static get routes():Router{
        const router=Router()

        //definir las rutas de auth

        router.post("/login",AutControllers.login)
        router.post("/register",AutControllers.register)
        router.get("/me",validateAuth,AutControllers.me)




        return router

    }
}