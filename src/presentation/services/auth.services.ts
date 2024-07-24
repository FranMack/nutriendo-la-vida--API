import { UserModel } from "../../data/Mongo/Models/user.models";
import { RegisterUserDto, LoginUserDto } from "../../domain/dto";
import { bcryptAdapter } from "../../config";
import { CustomError } from "../../domain/errors/custom.errors";
import { JWTadapter } from "../../config/jwt.adapter";
import { EmailService } from "./email.services";
import { envs } from "../../config";

export class AuthServices {
  static async login(userLoginDto: LoginUserDto) {
    const { email, password } = userLoginDto;

    try {
      const userExist = await UserModel.findOne({ email });
      if (!userExist) {
        throw CustomError.badRequest("Wrong credentials");
      }

      /*if (!userExist.emailValidated) {
                throw CustomError.badRequest("Su correo no ha sido validado");
              }*/

      const validatedPassword = bcryptAdapter.compare(
        password,
        userExist.password
      );
      if (!validatedPassword) {
        throw CustomError.badRequest("Wrong credentials");
      }

      const token = JWTadapter.generateToken({
        id: userExist.id,
        email: userExist.email,
        role:userExist.role[0]
      });

      if (!token) {
        throw CustomError.internalServer("Token erroneo");
      }

      return {
        name: userExist.name,
        lastname: userExist.lastname,
        email,
        token,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async register(userRegisterDto: RegisterUserDto) {
    const { name, lastname, email, password } = userRegisterDto;

    try {
      const userExist = await UserModel.findOne({ email });

      if (userExist) {
        throw new Error("User allready exist");
      }

      const newUser = new UserModel(userRegisterDto);
      const hashedPassword = bcryptAdapter.hash(password);

      newUser.password = hashedPassword;

      await newUser.save();

      //token para validacion de cuenta
      const token = JWTadapter.generateToken({ email });

      const link = `${envs.API_DOMAIN}/api/auth/validate-email/${token}`;

      const htmlBody = `
        
            <h1>Validate your Email</h1>
            <p>Click the followieng link to validate your email</p>
            <a href="${link}">Validate your email: ${email}</a>
            
            `;

      await EmailService.sendEmail({
        to: newUser.email,
        subject: "Nueva cuenta",
        htmlBody,
      });

      return { id: newUser.id, email, name, lastname, token };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async validateUser(token: string) {
    try {
      const payload = JWTadapter.validateJWT(token);

      if (!payload || !payload.email) {
        throw CustomError.badRequest("Invalid token");
      }

      const user = await UserModel.findOne({ email: payload.email });
      if (!user) {
        throw CustomError.badRequest("User not found");
      }

      user.emailValidated = true;

      await user.save();

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async forgotPassword(email:string){

    try{


        //token para validacion de cuenta
      const token = JWTadapter.generateToken({ email });

      const link = `${envs.API_DOMAIN}/api/auth/new-password/${token}`;

      const htmlBody = `
        
            <h1>Restore your password</h1>
            <p>Click the followieng link to </p>
            <a href="${link}">Change your password: ${email}</a>
            
            `;

      await EmailService.sendEmail({
        to:email,
        subject: "Recuperar contraseña",
        htmlBody,
      });



    }

    catch (error) {
        console.log(error);
        throw error;
      }

  }

  static async restorePassword(password:string,token:string){

    try{
        const {email} = JWTadapter.validateJWT(token);

        if(!email){
            throw CustomError.badRequest("Invalid token")
        }
        const user =await UserModel.findOne({email})

        if(!user){
            throw CustomError.badRequest("User not found");
        }

        user.password=bcryptAdapter.hash(password)
        await user.save()

        return


    }

    catch (error) {
        console.log(error);
        throw error;
      }

  }
}
