import DashboardLayout from "@/components/layouts/dashboard"
import Products from "@/components/products/products"
import Head from "next/head"

const ProductsList = () => {

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | مشاهده کالا ها`}</title>
      </Head>

      <Products/>

    </DashboardLayout>
  )

}

export default ProductsList;