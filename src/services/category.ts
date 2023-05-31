import Category from "@/models/category";
import callApi from "../helpers/callApi";

export async function GetCategories() {
    let res = await callApi().get(`/categories`);
    return res?.data;
}

export async function CreateCategory(category: Category) {
    return await callApi().post('/categories', category)
}