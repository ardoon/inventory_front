
import { addUnit } from "@/store/slices/unitsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "../partials/dashboard/list-item";
import ListItemInput from "../partials/dashboard/list-item-input";
import SectionHeading from "../partials/dashboard/section-heading";

export default function AllUnits({title} : {
    title?: string
}) {

    const units = useSelector((state : RootState) => state.units)

    return (
        <section>
            <SectionHeading title={title || `دسته های اصلی`} backward='/dashboard/products' />

            <ul className="grid grid-cols-3 gap-4">

                <div className="col-span-2"><ListItemInput id="categoryName" placeHolder="نام واحد جدید را وارد کنید.." /></div>
                
                {
                    units.map( (unit) => {
                        return <ListItem key={unit.name} label={unit.name} link={`/dashboard/products/units/${unit.name}`} />
                    })
                }
            </ul>
        </section>
    )
}