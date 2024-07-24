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
exports.AutControllers = void 0;
const auth_services_1 = require("../services/auth.services");
const dto_1 = require("../../domain/dto");
const custom_errors_1 = require("../../domain/errors/custom.errors");
class AutControllers {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [error, userLoginDto] = dto_1.LoginUserDto.create(req.body);
                if (error) {
                    return res.status(400).json({ error });
                }
                const user = yield auth_services_1.AuthServices.login(userLoginDto);
                res.json(user);
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
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [error, userRegisterDto] = dto_1.RegisterUserDto.create(req.body);
                if (error) {
                    return res.status(400).json({ error });
                }
                const user = yield auth_services_1.AuthServices.register(userRegisterDto);
                res.json(user);
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
    static me(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req.body;
            try {
                res.status(200).json(user);
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
    static validateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            try {
                const user = yield auth_services_1.AuthServices.validateUser(token);
                res.status(200).json(user);
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
    static forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            try {
                const newPassword = yield auth_services_1.AuthServices.forgotPassword(email);
                res.status(200).json("You will receive an email to restore your password");
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
    static restorePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, token } = req.body;
            try {
                //validar el password
                const newPassword = yield auth_services_1.AuthServices.restorePassword(password, token);
                res.status(200).json("Your password has been restored");
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
}
exports.AutControllers = AutControllers;
