import DashboardLayout from "@/components/layouts/dashboard"
import Products from "@/components/products/products"
import Head from "next/head"

const ProductsList = () => {

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | مشاهده کالا ها`}</title>
      </Head>

      <Products categoryLabel='مصالح مصرفی کارگاه' />

    </DashboardLayout>
  )

}

export default ProductsList;