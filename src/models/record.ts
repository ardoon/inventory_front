import Product from "./product";

export default interface Record {
    id: number,
    productId: number | string,
    productName: string,
    amount: number | string,
    unitId: number | string,
    unitName: string,
    price: number | string,
    description: string,
    product?: Product
}