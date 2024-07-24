"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuth = validateAuth;
const jwt_adapter_1 = require("../../config/jwt.adapter");
const custom_errors_1 = require("../../domain/errors/custom.errors");
function validateAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authorization = req.header("Authorization");
        try {
            if (!authorization) {
                throw custom_errors_1.CustomError.unAuthorized("Unauthorized");
            }
            if (!authorization.startsWith("Bearer ")) {
                throw custom_errors_1.CustomError.unAuthorized("Invalid Bearer Token");
            }
            const token = authorization.split(" ")[1] || "";
            if (!token) {
                throw custom_errors_1.CustomError.unAuthorized("Unauthorized");
            }
            const user = jwt_adapter_1.JWTadapter.validateJWT(token);
            if (!user) {
                throw custom_errors_1.CustomError.unAuthorized("Unauthorized");
            }
            req.body.user = user;
            next();
        }
        catch (error) {
            if (error instanceof custom_errors_1.CustomError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: "Internal server error" });
        }
    });
}
