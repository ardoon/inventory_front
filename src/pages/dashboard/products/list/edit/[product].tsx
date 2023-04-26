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

const EditProduct = () => {

    const { t } = useTranslation(['dashboard'])
  
    const units = [
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
  
        <SectionHeading title="ویرایش گرد بر سایز ۳۵" />
  
        <form className="grid grid-cols-2 gap-4">
  
          <TextInput id="productName" label="نام کالا" value="گرد بر سایز ۳۵" colSpan={1} />
          <TextInput id="primaryUnit" label="واحد اصلی" value="عدد" colSpan={1} data={units} />
          <TextInput id="secondaryUnit" label="واحد ثانویه" value="جین" colSpan={1} placeHolder='این فیلد اختیاری است' data={units} />
          <TextInput id="secondaryUnit" label="نسبت واحد ثانویه به اصلی" value="۱۲" colSpan={1} placeHolder='در صورت انتخاب واحد ثانویه نسبت وارد شود' />
  
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-md h-12 col-span-2 mt-4">ثبت کالا</button>
  
        </form>
  
      </DashboardLayout>
    )
  
  }

export default EditProduct;