import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TextInput from "@/components/partials/dashboard/TextInput"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { useTranslation } from "react-i18next"

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

const EditWarehouse = () => {

  const { t } = useTranslation(['dashboard'])

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ${t('head.title', { context: 'products' })}`}</title>
      </Head>

      <SectionHeading title="ویرایش انبار" />

      <form className="grid grid-cols-6 gap-4">

        <TextInput id="warehouseName" label="نام انبار" colSpan={3} value="عدد" />

        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-md h-12 col-span-1 self-end">اعمال تغییرات</button>
        <button className="bg-rose-500 justify-center flex items-center hover:bg-rose-600 rounded-md h-12 col-span-1 self-end">حذف</button>

      </form>

    </DashboardLayout>
  )

}

export default EditWarehouse;