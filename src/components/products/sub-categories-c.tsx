import { useRouter } from "next/router";
import ListItem from "../partials/dashboard/list-item";
import ListItemInput from "../partials/dashboard/list-item-input";
import SectionHeading from "../partials/dashboard/section-heading";
import ShortcutBox from "../partials/dashboard/shortcut-box";
import ShortcutBoxBtn from "../partials/dashboard/shortcut-boxBtn";
import { useEffect, useState } from "react";
import callApi from "@/helpers/callApi";
import useSWR, { mutate } from 'swr';
import Category from "@/models/category";


export default function SubCategories({ title }: {
    title?: string
}) {

    const router = useRouter();

    const {data: categories, error, mutate} = useSWR({url: '/dashboard/products'}, async () => {
        const res = (await callApi().get(`/categories?parentId=${router.query.category}`)).data;
        return res as Category[];
    })
    const loadingItems = !categories && !error;

    const [category, setCategory] = useState<Category | undefined>();
    useEffect(() => {
        callApi().get(`/categories/${router.query.category}`).then((res) => {
          setCategory(res.data);
          mutate();
        });
      },[router.query.category]);

    const add = async (category: Category) => {
        await callApi().post(`/categories`, {...category, parentId: parseInt(router.query.category as string)});
        await mutate();
    }

    const remove = async () => {
        try {
          await callApi().delete(`/categories/${router.query.category}`)
          router.back()
        } catch (err) {
          console.log(err);
        }
    }

    return (
        <section>
            <SectionHeading title={`دسته ${category?.name}`} backward />

            <div className="h-48 grid grid-cols-3 gap-6 mb-10">
                <ShortcutBox label='لیست کالاها' icon='archive' link={`list/${category?.id}`} />
                <ShortcutBox label='ویرایش دسته' icon='pencil-square' link={`edit/${category?.id}`} />
                <ShortcutBoxBtn label='حذف دسته' icon='trash' iconColor="rose-400" action={remove} />
            </div>

            <SectionHeading title='زیر دسته ها' search={true} />
            <ul className="space-y-6">

                <ListItemInput id="categoryName" add={add} placeHolder="نام بخش جدید را وارد کنید.." />

                {loadingItems ? <p>Loading..</p> : categories?.map((item: Category) => <ListItem label={item.name} link='/dashboard/products/' slug='[category]' id={item.id} disableAsLink />)}

            </ul>
        </section>
    )
}