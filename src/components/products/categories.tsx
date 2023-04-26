import ListItem from "../partials/dashboard/list-item";
import ListItemInput from "../partials/dashboard/list-item-input";
import SectionHeading from "../partials/dashboard/section-heading";

export default function Categories({title} : {
    title?: string
}) {

    return (
        <section>
            <SectionHeading title={title || `دسته های اصلی`} search={true} />

            <ul className="space-y-6">

                <ListItemInput id="categoryName" placeHolder="نام دسته جدید را وارد کنید.." />
                <ListItem label="مصالح مصرفی کارگاه" link='products/مصالح-مصرفی-کارگاه' />
                <ListItem label="ابنیه" link='products/ابنیه/زیرمجموعه' />
                <ListItem label="تاسیسات الکتریکی" link='/' />
                <ListItem label="تاسیسات مکانیکی" link='/' />

            </ul>
        </section>
    )
}