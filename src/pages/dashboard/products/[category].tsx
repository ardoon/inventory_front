import DashboardLayout from "@/components/layouts/dashboard"
import SubCategoriesC from "@/components/products/sub-categories-c"
import Head from "next/head"

const SubCategories = () => {

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | زیر دسته`}</title>
      </Head>

      <SubCategoriesC />

    </DashboardLayout>
  )

}

export default SubCategories;