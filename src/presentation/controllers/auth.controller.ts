import { Request, Response } from "express";
import { AuthServices } from "../services/auth.services";
import { LoginUserDto, RegisterUserDto } from "../../domain/dto";
import { CustomError } from "../../domain/errors/custom.errors";
import { UserModel } from "../../data/Mongo/Models/user.models";

export class AutControllers {

  static async login(req: Request, res: Response) {

    try{
        const [error,userLoginDto]=LoginUserDto.create(req.body)
        if (error) {
            return res.status(400).json({ error });
          }

        const user = await AuthServices.login(userLoginDto!);
        res.json(user);

    }

    catch (error) {
        if (error instanceof CustomError) {
          return res.status(error.statusCode).json({ error: error.message });
        }
        if (error instanceof Error) {
          return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal server error" });
      }

 
  }

  static async register(req: Request, res: Response) {
    try {
      const [error, userRegisterDto] = RegisterUserDto.create(req.body);

      if (error) {
        return res.status(400).json({ error });
      }

        const user = await AuthServices.register(userRegisterDto!);
        res.json(user);
     
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async me(req: Request, res: Response){

    const{user}=req.body
    try{

      res.status(200).json(user)


    }

    catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  } 

  static async validateUser(req: Request, res: Response){
    const {token}=req.params
    try{

      const user= await AuthServices.validateUser(token)

      res.status(200).json(user)

    }

    catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async forgotPassword (req: Request, res: Response){
    const{email}=req.params
    try{
      const newPassword=await AuthServices.forgotPassword(email)
      res.status(200).json("You will receive an email to restore your password")
    }

    catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }

  }

  static async restorePassword(req: Request, res: Response){
const{password,token}=req.body
try{

//validar el password

  const newPassword=await AuthServices.restorePassword(password,token)
  res.status(200).json("Your password has been restored")


}
    catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

}
