import Section from "@/models/section";
import { addSection, deleteSection } from "@/store/slices/sectionsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "../partials/dashboard/list-item";
import ListItemInput from "../partials/dashboard/list-item-input";
import SectionHeading from "../partials/dashboard/section-heading";
import ShortcutBox from "../partials/dashboard/shortcut-box";
import ShortcutBoxBtn from "../partials/dashboard/shortcut-boxBtn";

export default function SubSections({ title }: {
    title?: string
}) {

    const router = useRouter();

    const dispatch = useDispatch<AppDispatch>();

    const sections = useSelector((state: RootState) =>
        state.sections
    )

    const subSections = sections.filter(item => item.parentId === router.query.section)

    const section = sections.find((item) => {
        return item.id === router.query.section
    })

    const add = (section: Section) => {
        dispatch(addSection({
            ...section,
            parentId: router.query.section as string
        }));
    }

    const remove = () => {
        if(section)
            dispatch(deleteSection(section.id))
        router.back();
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

                {subSections.map(item => <ListItem label={item.name} link='/dashboard/sections/' slug='[section]' id={item.id} />)}

            </ul>
        </section>
    )
}