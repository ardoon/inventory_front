import DashboardLayout from "@/components/layouts/dashboard"
import ShortcutBox from "@/components/partials/dashboard/shortcut-box"
import TextInput from "@/components/partials/dashboard/TextInput"
import Categories from "@/components/products/categories"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { useTranslation } from "react-i18next"

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

const Products = () => {

  const { t } = useTranslation(['dashboard'])

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ${t('head.title', { context: 'products' })}`}</title>
      </Head>

      <header className="h-48 grid grid-cols-4 gap-6 mb-10">

        <ShortcutBox label='مشاهده واحدها' icon='rulers' link='products/units' />

        <div className="col-span-3 bg-slate-900 rounded-md p-8">

          <h3 className="font-bold text-gray-400 mb-8">ایجاد واحد شمارش جدید</h3>

          <form className="grid grid-cols-5 gap-4">

            <TextInput id="unitName" colSpan={4} label='عنوان واحد' />

            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 h-12 rounded-md self-end">ثبت</button>

          </form>

        </div>


      </header>

      <Categories />

    </DashboardLayout>
  )

}

export default Products;