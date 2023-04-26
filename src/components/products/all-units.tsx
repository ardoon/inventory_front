import ListItem from "../partials/dashboard/list-item";
import ListItemInput from "../partials/dashboard/list-item-input";
import SectionHeading from "../partials/dashboard/section-heading";

export default function AllUnits({title} : {
    title?: string
}) {

    return (
        <section>
            <SectionHeading title={title || `دسته های اصلی`} />

            <ul className="grid grid-cols-3 gap-4">

                <div className="col-span-2"><ListItemInput id="categoryName" placeHolder="نام واحد جدید را وارد کنید.." /></div>
                <ListItem label="عدد" link='/products/units/عدد' />
                <ListItem label="کارتون" link='/' />
                <ListItem label="جعبه" link='/' />
                <ListItem label="متر" link='/' />

            </ul>
        </section>
    )
}