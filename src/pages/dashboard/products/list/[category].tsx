import DashboardLayout from "@/components/layouts/dashboard"
import Products from "@/components/products/products"
import Head from "next/head"
import { useTranslation } from "react-i18next"

const ProductsList = () => {

  const { t } = useTranslation()

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ${t('head.title', { context: 'products' })}`}</title>
      </Head>

      <Products categoryLabel='مصالح مصرفی کارگاه' />

    </DashboardLayout>
  )

}

export default ProductsList;