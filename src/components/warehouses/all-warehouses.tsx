import ListItem from "../partials/dashboard/list-item";
import ListItemInput from "../partials/dashboard/list-item-input";
import SectionHeading from "../partials/dashboard/section-heading";

export default function AllWarehouses({title} : {
    title?: string
}) {

    const add = (name: string) => {

    }

    return (
        <section>
            <SectionHeading title={title || `دسته های اصلی`} />

            <ul className="grid grid-cols-3 gap-4">

                <div className="col-span-3"><ListItemInput add={add} id="categoryName" placeHolder="نام انبار جدید را وارد کنید.." /></div>
                <ListItem label="عدد" link='/dashboard/warehouses/' slug='[warehouse]' id='1' />
                <ListItem label="کارتون" link='/' slug='[warehouse]' id='1' /> 
                <ListItem label="جعبه" link='/' slug='[warehouse]' id='1' />
                <ListItem label="متر" link='/' slug='[warehouse]' id='1' />

            </ul>
        </section>
    )
}