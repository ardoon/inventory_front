import Section from "@/models/section";
import ListItem from "../partials/dashboard/list-item";
import ListItemInput from "../partials/dashboard/list-item-input";
import SectionHeading from "../partials/dashboard/section-heading";
import useSWR from 'swr';
import { CreateSection, GetSections } from '../../services/section';

export default function Sections({ title }: {
    title?: string
}) {

    const {data: sections, error, mutate} = useSWR({url: '/dashboard/sections'}, GetSections)
    const loadingItems = !sections && !error;  

    const add = async (section: Section) => {        
        try {
            await CreateSection(section);
            await mutate();
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <section>
            <SectionHeading title={title || `بخش های اصلی`} search={true} />

            <ul className="space-y-6">
                <>
                    <ListItemInput id="sectionName" add={add} placeHolder="نام بخش جدید را وارد کنید.." />
                    {
                        loadingItems
                        ? <h1>Loading..</h1>
                        :
                        sections.map((item: Section) => {
                            return <ListItem key={item.id} label={item.name} link='/dashboard/sections/' slug='[section]' id={item.id} />
                        })
                    }
                </>


            </ul>
        </section>
    )
}