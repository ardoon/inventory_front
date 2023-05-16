import SectionHeading from "../partials/dashboard/section-heading";
import TextInput from "../partials/dashboard/TextInput";

export default function NewProduct() {

    const units: Array<string> = ['کلیوگرم', 'متر', 'عدد']

    return (
        <section>

            <SectionHeading title="افزودن کالای جدید" />

            <form className="grid grid-cols-2 gap-6">
                <TextInput id='name' label='نام کالا' colSpan={1} />
                <TextInput id='unit' label='واحد' colSpan={1} data={units} />
                <TextInput id='secondaryUnit' label='واحد دوم' colSpan={1} placeHolder='اختیاری' data={units} />
                <TextInput id='ratio' label='نسبت واحد دوم به اول' colSpan={1} isDisable={true} placeHolder='برای فعال شدن واحد دوم را انتخاب کنید' />
                <TextInput id='secondaryUnit' label='واحد دوم' colSpan={1} placeHolder='اختیاری' data={units} />
            </form>

        </section>
    )

}