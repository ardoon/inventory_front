import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TextInput from "@/components/partials/dashboard/TextInput"
import Head from "next/head"
import { useTranslation } from "react-i18next"

const NewUser = () => {

  const { t } = useTranslation(['dashboard'])

  const access = [
    'مدیر',
    'انباردار',
    'عادی'
  ]

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ${t('head.title', { context: 'products' })}`}</title>
      </Head>

      <SectionHeading title="افزودن کاربر" />

      <form className="grid grid-cols-2 gap-4">

        <TextInput id="userName" label="نام کاربر" colSpan={1} />
        <TextInput id="access" label="دسترسی" colSpan={1} data={access} />
        <TextInput id="role" label="نفش" colSpan={1} />
        <TextInput id="phone" label="موبایل" colSpan={1} placeHolder='این فیلد اختیاری است' />

        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-md h-12 col-span-2 mt-4">ایجاد کاربر</button>

      </form>

    </DashboardLayout>
  )

}

export default NewUser;