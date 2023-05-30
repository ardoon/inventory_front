import Unit from "@/models/unit";
import callApi from "../helpers/callApi";

export async function GetUnits() {
    let res = await callApi().get(`/units`);
    return res?.data;
}

export async function CreateUnit(unit: Unit) {
    return await callApi().post('/units', unit)
}