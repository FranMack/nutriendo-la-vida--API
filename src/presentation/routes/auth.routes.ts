import { Router } from "express";
import { AutControllers } from "../controllers/auth.controller";
import { validateAuth } from "../midlewares";



export class AuthRoutes{

    static get routes():Router{
        const router=Router()

        //definir las rutas de auth

        router.post("/login",AutControllers.login)
        router.post("/register",AutControllers.register)
        router.get("/validate-email/:token",AutControllers.validateUser)
        router.get("/forgot-password/:email",AutControllers.forgotPassword)
        router.post("/restore-password",AutControllers.restorePassword)
        router.get("/me",validateAuth,AutControllers.me)


        


        return router

    }
}