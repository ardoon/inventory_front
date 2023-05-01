import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TextInput from "@/components/partials/dashboard/TextInput"
import Unit from "@/models/unit"
import { deleteUnit, updateUnit } from "@/store/slices/unitsSlice"
import { AppDispatch, RootState } from "@/store/store"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'sidebar',
        'dashboard',
      ])),
    },
  }
}

const EditUnit = () => {

  const router = useRouter()

  const urlName: string = router.query.unit as string

  const units = useSelector((state: RootState) => state.units)

  let unit: Unit | undefined;

  units.forEach((item) => {
    if (item.name === urlName) {
      unit = item
    }
  })

  const { t } = useTranslation(['dashboard'])

  const dispatch = useDispatch<AppDispatch>();

  const [unitName, setUnitName] = useState<string>(urlName);

  const inputHandler = (name: string) => {
    setUnitName(name)
  }

  const updateUnitHandler = (e: React.FormEvent) => {

    e.preventDefault();

    let unit = {
      name: unitName
    }

    // API call

    dispatch(updateUnit({unit, key: urlName}))

    router.push('/dashboard/products/units')

  }

  const deleteUnitHandler = (e: React.FormEvent, name: string | undefined) => {

    e.preventDefault();

    if (name !== undefined) {
      dispatch(deleteUnit(name))
      router.push('/dashboard/products/units')
    }


  }

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ${t('head.title', { context: 'products' })}`}</title>
      </Head>

      <SectionHeading title={`ویرایش ${urlName}`} backward={true} />

      {
        unit ?

          <form className="grid grid-cols-6 gap-4">

            <TextInput id="productName" label="نام واحد" colSpan={3} value={unitName} inputHandler={inputHandler} />

            <button onClick={(e) => updateUnitHandler(e)} type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-md h-12 col-span-1 self-end">اعمال تغییرات</button>
            <span onClick={(e) => deleteUnitHandler(e, unit?.name)} className="bg-rose-600 flex justify-center items-center hover:bg-rose-700 cursor-pointer rounded-md h-12 col-span-1 self-end">حذف واحد</span>

          </form>

          :

          <p>چنین واحدی وجود ندارد</p>
      }

    </DashboardLayout>
  )

}

export default EditUnit;