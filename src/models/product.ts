export default interface Product {
    id: string,
    name: string,
    categoryId: number,
    unitId: number,
    secondaryUnitId?: number,
    unitsRatio?: number,
    amount?: number
}