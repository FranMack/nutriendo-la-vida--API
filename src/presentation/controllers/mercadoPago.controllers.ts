import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.errors";
import { MercadoPagoServices } from "../services/mercadoPago.services";
import { error } from "console";



export class MercadoPagoControllers {
  static async createOrder(req: Request, res: Response) {
    try {
      const {buyerInfo,items} = req.body;
      const newPreference = await MercadoPagoServices.createOrder(
        buyerInfo,items
      );
      if (newPreference) {
        res.status(200).json({ link_de_pago: newPreference.init_point });
      } else {
        throw new Error("Error en el pago");
      }
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

  static async reciveWebhook(req: Request, res: Response) {
    const paymentQuery = req.query;

    try {
      const payment_id = await MercadoPagoServices.reciveWebhook(paymentQuery);

      res.status(200).json({
        message: `Your payment has been credited correctly your payment id is ${payment_id}`,
      });
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
}
