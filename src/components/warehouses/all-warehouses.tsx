import Warehouse from "@/models/warehouse";
import ListItem from "../partials/dashboard/list-item";
import ListItemInput from "../partials/dashboard/list-item-input";
import SectionHeading from "../partials/dashboard/section-heading";
import useSWR from 'swr';
import { CreateWarehouse, GetWarehouses } from '../../services/warehouse';

export default function AllWarehouses({ title }: {
    title?: string
}) {

    const { data: warehouses, error, mutate } = useSWR({ url: '/dashboard/warehouses' }, GetWarehouses)
    const loadingItems = !warehouses && !error;

    const add = async (warehouse: Warehouse) => {
        try {
            await CreateWarehouse(warehouse);
            await mutate();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section>
            <SectionHeading title={title || `دسته های اصلی`} />

            <ul className="grid grid-cols-3 gap-4">

                <div className="col-span-3"><ListItemInput add={add} id="categoryName" placeHolder="نام انبار جدید را وارد کنید.." /></div>
                {
                    loadingItems
                        ? <h1>Loading..</h1>
                        :
                        warehouses.map((warehouse: Warehouse) => {
                            return <ListItem key={warehouse.id} label={warehouse.name} link='/dashboard/warehouses/' slug='[warehouse]' id={warehouse.id} />
                        })
                }


            </ul>
        </section>
    )
}