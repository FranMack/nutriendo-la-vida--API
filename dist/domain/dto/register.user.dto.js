"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserDto = void 0;
const config_1 = require("../../config");
class RegisterUserDto {
    constructor(name, lastname, email, password) {
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }
    static create(object) {
        const { name, lastname, email, password } = object;
        // Validaciones del nombre
        if (!name) {
            return ["Falta el nombre", undefined];
        }
        if (!config_1.regularExps.only_letters.test(name)) {
            return ["El nombre debe contener letras y espacios", undefined];
        }
        //Validaciones del apellido
        if (!lastname) {
            return ["Falta el nombre", undefined];
        }
        if (!config_1.regularExps.only_letters.test(lastname)) {
            return ["El nombre debe contener letras y espacios", undefined];
        }
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
        if (!config_1.regularExps.contain_special_character.test(password)) {
            return [
                "La contraseña debe contener al menos un carácter especial",
                undefined,
            ];
        }
        if (!config_1.regularExps.contain_letter.test(password)) {
            return [
                "La contraseña debe contener al menos una letra minúscula",
                undefined,
            ];
        }
        if (!config_1.regularExps.contain_Capital_leter.test(password)) {
            return [
                "La contraseña debe contener al menos una letra mayúscula",
                undefined,
            ];
        }
        if (!config_1.regularExps.contain_number.test(password)) {
            return ["La contraseña debe contener al menos un número", undefined];
        }
        if (password.length < 6) {
            return ["La contraseña es demasiado corta", undefined];
        }
        return [undefined, new RegisterUserDto(name, lastname, email, password)];
    }
}
exports.RegisterUserDto = RegisterUserDto;
