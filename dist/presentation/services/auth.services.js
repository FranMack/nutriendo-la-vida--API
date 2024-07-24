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
exports.AuthServices = void 0;
const user_models_1 = require("../../data/Mongo/Models/user.models");
const config_1 = require("../../config");
const custom_errors_1 = require("../../domain/errors/custom.errors");
const jwt_adapter_1 = require("../../config/jwt.adapter");
const email_services_1 = require("./email.services");
const config_2 = require("../../config");
class AuthServices {
    static login(userLoginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = userLoginDto;
            try {
                const userExist = yield user_models_1.UserModel.findOne({ email });
                if (!userExist) {
                    throw custom_errors_1.CustomError.badRequest("Wrong credentials");
                }
                /*if (!userExist.emailValidated) {
                          throw CustomError.badRequest("Su correo no ha sido validado");
                        }*/
                const validatedPassword = config_1.bcryptAdapter.compare(password, userExist.password);
                if (!validatedPassword) {
                    throw custom_errors_1.CustomError.badRequest("Wrong credentials");
                }
                const token = jwt_adapter_1.JWTadapter.generateToken({
                    id: userExist.id,
                    email: userExist.email,
                    role: userExist.role[0]
                });
                if (!token) {
                    throw custom_errors_1.CustomError.internalServer("Token erroneo");
                }
                return {
                    name: userExist.name,
                    lastname: userExist.lastname,
                    email,
                    token,
                };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    static register(userRegisterDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, lastname, email, password } = userRegisterDto;
            try {
                const userExist = yield user_models_1.UserModel.findOne({ email });
                if (userExist) {
                    throw new Error("User allready exist");
                }
                const newUser = new user_models_1.UserModel(userRegisterDto);
                const hashedPassword = config_1.bcryptAdapter.hash(password);
                newUser.password = hashedPassword;
                yield newUser.save();
                //token para validacion de cuenta
                const token = jwt_adapter_1.JWTadapter.generateToken({ email });
                const link = `${config_2.envs.API_DOMAIN}/api/auth/validate-email/${token}`;
                const htmlBody = `
        
            <h1>Validate your Email</h1>
            <p>Click the followieng link to validate your email</p>
            <a href="${link}">Validate your email: ${email}</a>
            
            `;
                yield email_services_1.EmailService.sendEmail({
                    to: newUser.email,
                    subject: "Nueva cuenta",
                    htmlBody,
                });
                return { id: newUser.id, email, name, lastname, token };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    static validateUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = jwt_adapter_1.JWTadapter.validateJWT(token);
                if (!payload || !payload.email) {
                    throw custom_errors_1.CustomError.badRequest("Invalid token");
                }
                const user = yield user_models_1.UserModel.findOne({ email: payload.email });
                if (!user) {
                    throw custom_errors_1.CustomError.badRequest("User not found");
                }
                user.emailValidated = true;
                yield user.save();
                return user;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    static forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //token para validacion de cuenta
                const token = jwt_adapter_1.JWTadapter.generateToken({ email });
                const link = `${config_2.envs.API_DOMAIN}/api/auth/new-password/${token}`;
                const htmlBody = `
        
            <h1>Restore your password</h1>
            <p>Click the followieng link to </p>
            <a href="${link}">Change your password: ${email}</a>
            
            `;
                yield email_services_1.EmailService.sendEmail({
                    to: email,
                    subject: "Recuperar contraseña",
                    htmlBody,
                });
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    static restorePassword(password, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = jwt_adapter_1.JWTadapter.validateJWT(token);
                if (!email) {
                    throw custom_errors_1.CustomError.badRequest("Invalid token");
                }
                const user = yield user_models_1.UserModel.findOne({ email });
                if (!user) {
                    throw custom_errors_1.CustomError.badRequest("User not found");
                }
                user.password = config_1.bcryptAdapter.hash(password);
                yield user.save();
                return;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
}
exports.AuthServices = AuthServices;
