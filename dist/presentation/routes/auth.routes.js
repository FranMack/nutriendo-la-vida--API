"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const midlewares_1 = require("../midlewares");
class AuthRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        //definir las rutas de auth
        router.post("/login", auth_controller_1.AutControllers.login);
        router.post("/register", auth_controller_1.AutControllers.register);
        router.get("/validate-email/:token", auth_controller_1.AutControllers.validateUser);
        router.get("/forgot-password/:email", auth_controller_1.AutControllers.forgotPassword);
        router.post("/restore-password", auth_controller_1.AutControllers.restorePassword);
        router.get("/me", midlewares_1.validateAuth, auth_controller_1.AutControllers.me);
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
