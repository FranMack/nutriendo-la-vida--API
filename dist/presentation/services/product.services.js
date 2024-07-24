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
exports.ProductServices = void 0;
const product_models_1 = require("../../data/Mongo/Models/product.models");
const custom_errors_1 = require("../../domain/errors/custom.errors");
class ProductServices {
    static createProduct(productDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, description, image } = productDto;
            try {
                const productExist = yield product_models_1.ProductModel.findOne({ name });
                if (productExist) {
                    throw custom_errors_1.CustomError.badRequest("Product already exist");
                }
                const newProduct = yield product_models_1.ProductModel.create({ name, price, description, image });
                return newProduct;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    static editProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, price, description, image } = data;
            try {
                const productExist = yield product_models_1.ProductModel.findById(id);
                if (!productExist) {
                    throw custom_errors_1.CustomError.badRequest("Product not found");
                }
                name ? productExist.name = name : false;
                price ? productExist.price = price : false;
                description ? productExist.description = description : false;
                image ? productExist.image = image : false;
                yield productExist.save();
                return productExist;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    static productList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_models_1.ProductModel.find();
                return products;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
}
exports.ProductServices = ProductServices;
