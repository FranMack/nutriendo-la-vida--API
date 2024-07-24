"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = void 0;
const config_1 = require("../../config");
class LoginUserDto {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    static create(object) {
        const { email, password } = object;
        // Validaciones del email
        if (!email) {
            return ["Falta el correo electrónico", undefined];
        }
        if (!config_1.regularExps.email.test(email)) {
            return ["El correo electrónico no es válido", undefined];
        }
        // Validaciones de la contraseña
        if (!password) {
            return ["Falta la contraseña", undefined];
        }
        return [undefined, new LoginUserDto(email, password)];
    }
}
exports.LoginUserDto = LoginUserDto;
