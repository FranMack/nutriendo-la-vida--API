import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.errors";
import { ProductServices } from "../services/product.services";
import { CreateProductDto } from "../../domain/dto";

export class ProductControllers {
  static async createProduct(req: Request, res: Response) {
    try {


      const[error,productDto]=CreateProductDto.create(req.body)

      if(error){
        throw CustomError.badRequest(error)
      }


      const newProduct = await ProductServices.createProduct(productDto!);

      res.status(200).json(newProduct);
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

  static async editProduct(req: Request, res: Response){
    try{
      const editedProduct = await ProductServices.editProduct(req.body);
      res.status(200).json(editedProduct);
      
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

  static async productList (req: Request, res: Response){

  try{
    const products = await ProductServices.productList()
    res.status(200).json(products);

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
