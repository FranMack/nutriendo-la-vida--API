

export class CreateProductDto {
  constructor(
    readonly name: string,
    readonly price: number,
    readonly description: string,
    readonly image?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, price, description,image } = object;

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

    return [undefined, new CreateProductDto(name, price, description,image)];
  }
}
