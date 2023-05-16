import DashboardLayout from "@/components/layouts/dashboard"
import AllWarehouses from "@/components/warehouses/all-warehouses"
import Head from "next/head"

const Warehouses = () => {

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | لیست همه انبار ها`}</title>
      </Head>

      <AllWarehouses title="لیست همه انبارها" />

    </DashboardLayout>
  )

}

export default Warehouses;