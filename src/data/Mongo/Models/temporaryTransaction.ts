import mongoose from "mongoose";

const temporaryTransactionSchema = new mongoose.Schema({
  preferenceId: {
    type: String,
    required: [true, "preferenceId is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // Documento será eliminado después de 1 hora (3600 segundos)
  },
  buyerInfo: {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
  },
  itemsInfo: [
    {
      title: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      unit_price: {
        type: Number,
        required: true,
      },
      consult:{
        type:Boolean,
        default: false,
    },
      currency: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
  ],
});

temporaryTransactionSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

export const TemporaryTransactionModel = mongoose.model(
  "TemporaryTransaction",
  temporaryTransactionSchema
);
