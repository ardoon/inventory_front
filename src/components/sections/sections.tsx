import Section from "@/models/section";
import { addSection } from "@/store/slices/sectionsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "../partials/dashboard/list-item";
import ListItemInput from "../partials/dashboard/list-item-input";
import SectionHeading from "../partials/dashboard/section-heading";

export default function Sections({ title }: {
    title?: string
}) {

    const dispatch = useDispatch<AppDispatch>();

    const sections = useSelector((state: RootState) =>
        state.sections.filter(section => section.parentId === undefined)
    )    

    const add = (section: Section) => {        
        dispatch(addSection(section));
    }

    return (
        <section>
            <SectionHeading title={title || `بخش های اصلی`} search={true} />

            <ul className="space-y-6">
                <>
                    <ListItemInput id="sectionName" add={add} placeHolder="نام بخش جدید را وارد کنید.." />
                    {
                        sections.map((item) => {
                            return <ListItem key={item.id} label={item.name} link='/dashboard/sections/' slug='[section]' id={item.id} />
                        })
                    }
                </>


            </ul>
        </section>
    )
}