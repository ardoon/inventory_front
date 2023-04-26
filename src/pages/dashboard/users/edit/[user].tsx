import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TextInput from "@/components/partials/dashboard/TextInput"
import Products from "@/components/products/products"
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

const EditUser = () => {

  const { t } = useTranslation(['dashboard'])

  const access = [
    'متر',
    'کلیوگرم',
    'بسته',
    'کیسه',
    'عدد'
  ]

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ${t('head.title', { context: 'products' })}`}</title>
      </Head>

      <SectionHeading title="ویرایش کاربر" />

      <form className="grid grid-cols-2 gap-4">

        <TextInput id="userName" label="نام کاربر" colSpan={1} />
        <TextInput id="access" label="دسترسی" colSpan={1} data={access} />
        <TextInput id="role" label="نفش" colSpan={1} />
        <TextInput id="phone" label="موبایل" colSpan={1} placeHolder='این فیلد اختیاری است' />

        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-md h-12 col-span-2 mt-4">ثبت تغییرات</button>

      </form>

      <form className="grid grid-cols-2 gap-4 mt-20">

        <TextInput id="password" label="گذرواژه" colSpan={1} />
        <TextInput id="confirmPassword" label="تکرار گذرواژه" colSpan={1} />

        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-md h-12 col-span-2 mt-4">تغییر گذرواژه</button>

      </form>

    </DashboardLayout>
  )

}

export default EditUser;