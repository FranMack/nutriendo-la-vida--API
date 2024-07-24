"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const custom_errors_1 = require("../../domain/errors/custom.errors");
const product_services_1 = require("../services/product.services");
const dto_1 = require("../../domain/dto");
class ProductControllers {
    static createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [error, productDto] = dto_1.CreateProductDto.create(req.body);
                if (error) {
                    throw custom_errors_1.CustomError.badRequest(error);
                }
                const newProduct = yield product_services_1.ProductServices.createProduct(productDto);
                res.status(200).json(newProduct);
            }
            catch (error) {
                if (error instanceof custom_errors_1.CustomError) {
                    return res.status(error.statusCode).json({ error: error.message });
                }
                if (error instanceof Error) {
                    return res.status(500).json({ error: error.message });
                }
                return res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    static editProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const editedProduct = yield product_services_1.ProductServices.editProduct(req.body);
                res.status(200).json(editedProduct);
            }
            catch (error) {
                if (error instanceof custom_errors_1.CustomError) {
                    return res.status(error.statusCode).json({ error: error.message });
                }
                if (error instanceof Error) {
                    return res.status(500).json({ error: error.message });
                }
                return res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    static productList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_services_1.ProductServices.productList();
                res.status(200).json(products);
            }
            catch (error) {
                if (error instanceof custom_errors_1.CustomError) {
                    return res.status(error.statusCode).json({ error: error.message });
                }
                if (error instanceof Error) {
                    return res.status(500).json({ error: error.message });
                }
                return res.status(500).json({ error: "Internal server error" });
            }
        });
    }
}
exports.ProductControllers = ProductControllers;
