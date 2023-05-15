import Warehouse from "@/models/warehouse";
import { addWarehouse } from "@/store/slices/warehousesSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "../partials/dashboard/list-item";
import ListItemInput from "../partials/dashboard/list-item-input";
import SectionHeading from "../partials/dashboard/section-heading";

export default function AllWarehouses({title} : {
    title?: string
}) {

    const dispatch = useDispatch<AppDispatch>();

    const warehouses = useSelector((state : RootState) => state.warehouses)

    const add = (warehouse: Warehouse) => {
        dispatch(addWarehouse(warehouse));
    }

    return (
        <section>
            <SectionHeading title={title || `دسته های اصلی`} />

            <ul className="grid grid-cols-3 gap-4">

                <div className="col-span-3"><ListItemInput add={add} id="categoryName" placeHolder="نام انبار جدید را وارد کنید.." /></div>
                {
                    warehouses.map((warehouse) => {
                        return <ListItem label={warehouse.name} link='/dashboard/warehouses/' slug='[warehouse]' id={warehouse.id} /> 
                    })
                }
                

            </ul>
        </section>
    )
}