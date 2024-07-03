import { regularExps } from "../../config";

export class LoginUserDto {
  constructor(
    readonly email: string,
    readonly password: string
  ) {}

  static create(object: { [key: string]: string }): [string?, LoginUserDto?] {
    const { email, password } = object;

   

    // Validaciones del email
    if (!email) {
      return ["Falta el correo electrónico", undefined];
    }
    if (!regularExps.email.test(email)) {
      return ["El correo electrónico no es válido", undefined];
    }

    // Validaciones de la contraseña
    if (!password) {
      return ["Falta la contraseña", undefined];
    }
    

    return [undefined, new LoginUserDto(email, password)];
  }
}
