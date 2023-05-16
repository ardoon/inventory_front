import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TextInput from "@/components/partials/dashboard/TextInput"
import { deleteWarehouse, updateWarehouse } from "@/store/slices/warehousesSlice"
import { AppDispatch, RootState } from "@/store/store"
import Head from "next/head"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const EditWarehouse = () => {

  const router = useRouter();
  const warehouseId = router.query.warehouse;

  const warehouse = useSelector((state: RootState) => state.warehouses.find((warehouse)=> warehouse.id === warehouseId))

  const [name, setName] = useState<string>(warehouse?.name ?? "")

  function inputHandler(value: string) {
    setName(value);
  }

  const dispatch = useDispatch<AppDispatch>();

  function update(e: FormEvent) {
    e.preventDefault();
    dispatch(updateWarehouse({
      ...warehouse,
      name
    }));
    router.back();
  }

  function remove(e: FormEvent) {
    e.preventDefault();
    dispatch(deleteWarehouse(warehouse?.id as string))
    router.back();
  }

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ویرایش انبار`}</title>
      </Head>

      <SectionHeading title="ویرایش انبار" />

      <form className="grid grid-cols-6 gap-4">

        <TextInput inputHandler={inputHandler} id="warehouseName" label="نام انبار" colSpan={3} value={name} />

        <button onClick={(e) => update(e)} type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-md h-12 col-span-1 self-end">اعمال تغییرات</button>
        <button onClick={(e) => remove(e)} className="bg-rose-500 justify-center flex items-center hover:bg-rose-600 rounded-md h-12 col-span-1 self-end">حذف</button>

      </form>

    </DashboardLayout>
  )

}

export default EditWarehouse;