import Category from "@/models/category";
import { addCategory } from "@/store/slices/categoriesSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "../partials/dashboard/list-item";
import ListItemInput from "../partials/dashboard/list-item-input";
import SectionHeading from "../partials/dashboard/section-heading";

export default function Categories({ title }: {
    title?: string
}) {

    const categories = useSelector((state: RootState) => 
        state.categories.filter(category => category.parentId === undefined)
    )

    const dispatch = useDispatch<AppDispatch>();

    const add = (category: Category) => {
        dispatch(addCategory(category));
    }

    return (
        <section>
            <SectionHeading title={title || `دسته های اصلی`} search={true} />

            <ul className="space-y-6">

                <ListItemInput id="categoryName" add={add} placeHolder="نام دسته جدید را وارد کنید.." />
                {
                    categories.map((category) => {
                        return <ListItem key={category.id} label={category.name} link={`/dashboard/products/`} slug='[category]' id={category.id} />
                    })
                }


            </ul>
        </section>
    )
}