import mongoose from "mongoose";

const buyersHistorySchema= new mongoose.Schema({

    name:{
        type:String,
        required:[true, "Name is required"]
    },
    lastname:{
        type:String,
        required:[true, "Lastname is required"]
    },
    email:{
        type:String,
        required:[true, "Email is required"],
     
    },
    phone:{
        type:String,
        default:false
    },
   
    
})

buyersHistorySchema.set("toJSON",{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret,options){
      delete ret._id;
      delete ret.password;
    },
  })


export const BuyersHistorynModel= mongoose.model("BuyersHistory",buyersHistorySchema)