import { ProductModel } from "../../data/Mongo/Models/product.models"
import { CustomError } from "../../domain/errors/custom.errors"
import { CreateProductDto } from "../../domain/dto"


export class ProductServices{

    static async createProduct(productDto:CreateProductDto){

        const {name,price,description,image}=productDto

        try{
            const productExist=await ProductModel.findOne({name})
            if(productExist){
                throw CustomError.badRequest("Product already exist")
            }
            const newProduct =await ProductModel.create({name,price,description,image})

            return newProduct

        }

        catch(error){
            console.log(error)
            throw error
        }
    }

    static async editProduct(data:any){
        const{id,name,price,description,image}=data
        try{
            const productExist=await ProductModel.findById(id)
            if(!productExist){
                throw CustomError.badRequest("Product not found")
            }
            name ? productExist.name=name :false
            price ? productExist.price=price :false
            description ? productExist.description=description :false
            image ? productExist.image=image :false

            await productExist.save()

            return productExist


        }

        catch(error){
            console.log(error)
            throw error
        }
    }

    static async productList(){

        try{
            const products= await ProductModel.find()

            return products

        }

        catch(error){
            console.log(error)
            throw error
        }
    }
}