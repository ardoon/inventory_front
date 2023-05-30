import Unit from "@/models/unit";
import { addUnit, setUnits } from "@/store/slices/unitsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "../partials/dashboard/list-item";
import ListItemInput from "../partials/dashboard/list-item-input";
import SectionHeading from "../partials/dashboard/section-heading";
import useSWR from 'swr';
import { CreateUnit, GetUnits } from '../../services/unit'

export default function AllUnits({title} : {
    title?: string
}) {
    
    const {data: units, error, mutate} = useSWR({url: '/dashboard/products/units'}, GetUnits)
    const loadingItems = !units && !error;

    const add = async (unit: Unit) => {
        try {
            await CreateUnit(unit);
            await mutate();
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <section>
            <SectionHeading title={title || `دسته های اصلی`} backward='/dashboard/products' />

            <ul className="grid grid-cols-3 gap-4">

                <div className="col-span-2"><ListItemInput id="categoryName" add={add} placeHolder="نام واحد جدید را وارد کنید.." /></div>
                
                {
                    loadingItems
                    ? <h1>Loading..</h1>
                    : units.map( (unit: Unit) => {
                        return <ListItem key={unit.id} label={unit.name} link={`/dashboard/products/units/`} slug="[unit]" id={unit.id} />
                    })
                }
            </ul>
        </section>
    )
}