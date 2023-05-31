import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TextInput from "@/components/partials/dashboard/TextInput"
import callApi from "@/helpers/callApi"
import Unit from "@/models/unit"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const EditUnit = () => {

  const router = useRouter()

  const urlId: string = router.query.unit as string

  const [unit, setUnit] = useState<Unit | undefined>();

  useEffect(() => {
    callApi().get(`/units/${urlId}`).then((res) => {
      setUnit(res.data);
    });
  },[]);

  const [unitName, setUnitName] = useState<string | undefined>(unit?.name);

  const inputHandler = (name: string) => {
    setUnitName(name)
  }

  const updateUnitHandler = async (e: React.FormEvent) => {

    e.preventDefault();

    let unit = {
      name: unitName
    }

    try {
      await callApi().patch(`/units/${urlId}`, {
        name: unitName
      })
      router.push('/dashboard/products/units')
    } catch (err) {
      console.log(err);
    }

  }

  const deleteUnitHandler = async (e: React.FormEvent) => {

    e.preventDefault();

    try {
      await callApi().delete(`/units/${urlId}`)
      router.push('/dashboard/products/units')
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ویرایش واحد`}</title>
      </Head>

      <SectionHeading title={`ویرایش ${unit?.name}`} backward={true} />

      {
        unit ?

          <form className="grid grid-cols-6 gap-4">

            <TextInput id="productName" label="نام واحد" colSpan={3} value={unitName} defaultValue={unit?.name} inputHandler={inputHandler} />

            <button onClick={(e) => updateUnitHandler(e)} type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-md h-12 col-span-1 self-end">اعمال تغییرات</button>
            <span onClick={(e) => deleteUnitHandler(e)} className="bg-rose-600 flex justify-center items-center hover:bg-rose-700 cursor-pointer rounded-md h-12 col-span-1 self-end">حذف واحد</span>

          </form>

          :

          <p>چنین واحدی وجود ندارد</p>
      }

    </DashboardLayout>
  )

}

export default EditUnit;