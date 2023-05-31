import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TextInput from "@/components/partials/dashboard/TextInput"
import callApi from "@/helpers/callApi"
import Warehouse from "@/models/warehouse"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const EditWarehouse = () => {

  const router = useRouter()

  const urlId: string = router.query.warehouse as string

  const [warehouse, setWarehouse] = useState<Warehouse | undefined>();

  useEffect(() => {
    callApi().get(`/warehouses/${urlId}`).then((res) => {
      setWarehouse(res.data);
    });
  },[]);

  const [warehouseName, setWarehouseName] = useState<string | undefined>(warehouse?.name);

  const inputHandler = (name: string) => {
    setWarehouseName(name)
  }

  const updateWarehouseHandler = async (e: React.FormEvent) => {

    e.preventDefault();

    try {
      await callApi().patch(`/warehouses/${urlId}`, {
        name: warehouseName
      })
      router.push('/dashboard/warehouses')
    } catch (err) {
      console.log(err);
    }

  }

  const deleteWarehouseHandler = async (e: React.FormEvent) => {

    e.preventDefault();

    try {
      await callApi().delete(`/warehouses/${urlId}`)
      router.push('/dashboard/warehouses')
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ویرایش انبار`}</title>
      </Head>

      <SectionHeading title={`ویرایش ${warehouse?.name}`} backward={true} />

      {
        warehouse ?

          <form className="grid grid-cols-6 gap-4">

            <TextInput id="productName" label="نام واحد" colSpan={3} value={warehouseName} defaultValue={warehouse?.name} inputHandler={inputHandler} />

            <button onClick={(e) => updateWarehouseHandler(e)} type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-md h-12 col-span-1 self-end">اعمال تغییرات</button>
            <span onClick={(e) => deleteWarehouseHandler(e)} className="bg-rose-600 flex justify-center items-center hover:bg-rose-700 cursor-pointer rounded-md h-12 col-span-1 self-end">حذف واحد</span>

          </form>

          :

          <p>چنین انباری وجود ندارد</p>
      }

    </DashboardLayout>
  )

}

export default EditWarehouse;