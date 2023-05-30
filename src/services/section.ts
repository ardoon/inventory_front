import Section from "@/models/section";
import callApi from "../helpers/callApi";

export async function GetSections() {
    let res = await callApi().get(`/sections`);
    return res?.data;
}

export async function CreateSection(section: Section) {
    return await callApi().post('/sections', section)
}