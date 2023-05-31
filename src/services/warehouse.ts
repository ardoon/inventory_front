import Warehouse from "@/models/warehouse";
import callApi from "../helpers/callApi";

export async function GetWarehouses() {
    let res = await callApi().get(`/warehouses`);
    return res?.data;
}

export async function CreateWarehouse(warehouse: Warehouse) {
    return await callApi().post('/warehouses', warehouse)
}