import Category from "@/models/category";
import ListItem from "../partials/dashboard/list-item";
import ListItemInput from "../partials/dashboard/list-item-input";
import SectionHeading from "../partials/dashboard/section-heading";
import { CreateCategory, GetCategories } from "@/services/category";
import useSWR from 'swr';
import { useEffect } from "react";

export default function Categories({ title }: {
    title?: string
}) {

    const {data: categories, error, mutate} = useSWR({url: '/dashboard/categories'}, GetCategories)
    const loadingItems = !categories && !error;  

    useEffect(() => {
        mutate();
    });

    const add = async (category: Category) => {        
        try {
            await CreateCategory(category);
            await mutate();
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <section>
            <SectionHeading title={title || `دسته های اصلی`} search={true} />

            <ul className="space-y-6">

                <ListItemInput id="categoryName" add={add} placeHolder="نام دسته جدید را وارد کنید.." />
                {
                    loadingItems ? <p>Loading..</p>
                    : categories.map((category: Category) => {
                        return <ListItem key={category.id} label={category.name} link={`/dashboard/products/`} slug='[category]' id={category.id} />
                    })
                }

            </ul>
        </section>
    )
}