import Section from "@/models/section";
import { useRouter } from "next/router";
import ListItem from "../partials/dashboard/list-item";
import ListItemInput from "../partials/dashboard/list-item-input";
import SectionHeading from "../partials/dashboard/section-heading";
import ShortcutBox from "../partials/dashboard/shortcut-box";
import ShortcutBoxBtn from "../partials/dashboard/shortcut-boxBtn";
import { useEffect, useState } from "react";
import callApi from "@/helpers/callApi";
import useSWR, { mutate } from 'swr';


export default function SubSections({ title }: {
    title?: string
}) {

    const router = useRouter();

    const {data: sections, error, mutate} = useSWR({url: '/dashboard/sections'}, async () => {
        const res = (await callApi().get(`/sections?parentId=${router.query.section}`)).data;
        return res as Section[];
    })
    const loadingItems = !sections && !error;

    const [section, setSection] = useState<Section | undefined>();
    useEffect(() => {
        callApi().get(`/sections/${router.query.section}`).then((res) => {
          setSection(res.data);
          mutate();
        });
      },[router.query.section]);

    const add = async (section: Section) => {
        await callApi().post(`/sections`, {...section, parentId: parseInt(router.query.section as string)});
        await mutate();
    }

    const remove = async () => {
        try {
          await callApi().delete(`/sections/${router.query.section}`)
          router.back()
        } catch (err) {
          console.log(err);
        }
    }

    return (
        <section>
            <SectionHeading title={`بخش ${section?.name}`} backward />

            <div className="h-48 grid grid-cols-2 gap-6 mb-10">
                <ShortcutBox label='ویرایش بخش' icon='pencil-square' link={`/dashboard/sections/edit/${section?.id}`} />
                <ShortcutBoxBtn label='حذف بخش' icon='trash' iconColor="rose-400" action={remove} />
            </div>

            <SectionHeading title='زیر بخش ها' search={true} />
            <ul className="space-y-6">

                <ListItemInput id="categoryName" add={add} placeHolder="نام بخش جدید را وارد کنید.." />

                {loadingItems ? <p>Loading..</p> : sections?.map((item: Section) => <ListItem label={item.name} link='/dashboard/sections/' slug='[section]' id={item.id} disableAsLink />)}

            </ul>
        </section>
    )
}