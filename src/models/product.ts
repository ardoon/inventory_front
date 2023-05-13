export default interface Product {
    id: string,
    name: string,
    categoryId: string,
    unit: string,
    secondaryUnit?: string,
    unitsRatio?: number
}