export default interface OutgoRecord {
    id: number,
    productId: number | string,
    productName: string,
    amount: number | string,
    unitId: number | string,
    unitName: string,
    description: string
}