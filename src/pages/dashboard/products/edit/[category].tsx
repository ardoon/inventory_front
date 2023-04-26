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

const SubCategories = () => {

  const { t } = useTranslation(['dashboard'])

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ویرایش مصالح مصرفی کارگاه`}</title>
      </Head>

      <section className="mb-10">
        <SectionHeading title='ویرایش مصالح مصرفی کارگاه' />

        <form className="grid grid-cols-6 gap-4">
          <TextInput id='categoryName' label='نام دسته' colSpan={4} />
          <button type="submit" className="bg-indigo-600 h-12 self-end rounded-md">ذخیره</button>
        </form>

      </section>

    </DashboardLayout>
  )

}

export default SubCategories;