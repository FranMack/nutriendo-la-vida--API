import mongoose from "mongoose";

interface Options{
    mongoUrl:string,
   
}

export class MongoDataBase{
    static async conect({mongoUrl}:Options){

        try{
            await mongoose.connect(mongoUrl)
            console.log("Mongo conected")
            return 

        }

        catch(error){
            console.log(error)
        }

    }


    }

