"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductDto = void 0;
class CreateProductDto {
    constructor(name, price, description, image) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
    }
    static create(object) {
        const { name, price, description, image } = object;
        // Validaciones del nombre
        if (!name) {
            return ["Missing product name", undefined];
        }
        //validaciones del precio
        if (!price) {
            return ["Missing product price", undefined];
        }
        // Validaciones de la descripción
        if (!description) {
            return ["missing product description", undefined];
        }
        return [undefined, new CreateProductDto(name, price, description, image)];
    }
}
exports.CreateProductDto = CreateProductDto;
