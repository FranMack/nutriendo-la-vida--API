import mongoose, { Schema } from "mongoose";

const salesHistorySchema= new mongoose.Schema({
    payment_id:
    {
        type:String,
        required:[true, "Payment id is required"]
    },

    product:{
        type:String,
        required:[true, "Product is required"]
    },
    price:{
        type:Number,
        required:[true, "Price is required"]
    },
    date: {
        type: Date,
        default: Date.now,
      },
   
    buyerId:{
        type:Schema.Types.ObjectId,
        ref:"BuyersHistory",
        require:true
    }
 
   
    
})


salesHistorySchema.set("toJSON",{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret,options){
      delete ret._id;
      delete ret.password;
    },
  })


export const SalesHistorynModel= mongoose.model("SalesHistory",salesHistorySchema)