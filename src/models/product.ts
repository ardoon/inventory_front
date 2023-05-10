export default interface Product {
    id: string,
    name: string,
    categoryId: string,
    unitId: string,
    secondaryUnitId?: string,
    unitsRatio?: number
}