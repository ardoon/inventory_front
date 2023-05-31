import Section from "@/models/section";
import callApi from "../helpers/callApi";

export async function GetUsers() {
    let res = await callApi().get(`/users`);
    return res?.data;
}