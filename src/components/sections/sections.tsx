import ListItem from "../partials/dashboard/list-item";
import ListItemInput from "../partials/dashboard/list-item-input";
import SectionHeading from "../partials/dashboard/section-heading";
import ShortcutBox from "../partials/dashboard/shortcut-box";

export default function Sections({ title }: {
    title?: string
}) {

    const add = (name: string) => {

    }

    return (
        <section>
            <SectionHeading title={title || `بخش های اصلی`} search={true} />

            <div className="h-48 grid grid-cols-2 gap-6 mb-10">
                <ShortcutBox label='ویرایش بخش' icon='pencil-square' link='edit/مصالح-مصرفی-کارگاه' />
                <ShortcutBox label='حذف بخش' icon='trash' iconColor="rose-400" link='/' />
            </div>

            <ul className="space-y-6">

                <ListItemInput id="categoryName" add={add} placeHolder="نام بخش جدید را وارد کنید.." />
                <ListItem label="مصالح مصرفی کارگاه" link='products/' slug='[section]' id='1'/>
                <ListItem label="ابنیه" link='products/ابنیه/زیرمجموعه' slug='[section]' id='1'/>
                <ListItem label="تاسیسات الکتریکی" link='/' slug='[section]' id='1'/>
                <ListItem label="تاسیسات مکانیکی" link='/' slug='[section]' id='1'/>

            </ul>
        </section>
    )
}