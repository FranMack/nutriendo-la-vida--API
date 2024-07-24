import { NextFunction, Request, Response } from "express";
import { JWTadapter } from "../../config/jwt.adapter";
import { CustomError } from "../../domain/errors/custom.errors";

export async function validateAdminAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.header("Authorization");

  try {
    if (!authorization) {
      throw CustomError.unAuthorized("Unauthorized");
    }

    if (!authorization.startsWith("Bearer ")) {
      throw CustomError.unAuthorized("Invalid Bearer Token");
    }

    const token = authorization.split(" ")[1] || "";

    if (!token) {
      throw CustomError.unAuthorized("Unauthorized");
    }

    const user = JWTadapter.validateJWT(token);


    if (!user) {
        throw CustomError.unAuthorized("Unauthorized");
    }

    if(user.role!=="ADMIN_ROLE"){
        throw CustomError.unAuthorized("Unauthorized user");
    }


    req.body.user = user;

    next();
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
