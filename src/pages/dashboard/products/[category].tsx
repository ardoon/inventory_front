import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import ShortcutBox from "@/components/partials/dashboard/shortcut-box"
import Categories from "@/components/products/categories"
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

const SubCategories = () => {

  const { t } = useTranslation(['dashboard'])

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | مصالح مصرفی کارگاه`}</title>
      </Head>

      <header className="mb-10">
        <SectionHeading title='مصالح مصرفی کارگاه' />

        <div className="h-48 grid grid-cols-3 gap-6 mb-10">
          <ShortcutBox label='لیست کالاها' icon='archive' link='list/مصالح-مصرفی-کارگاه' />
          <ShortcutBox label='ویرایش دسته' icon='pencil-square' link='edit/مصالح-مصرفی-کارگاه' />
          <ShortcutBox label='حذف دسته' icon='trash' iconColor="rose-400" link='/' />
        </div>

      </header>

      <Categories title='زیر دسته ها' />

    </DashboardLayout>
  )

}

export default SubCategories;