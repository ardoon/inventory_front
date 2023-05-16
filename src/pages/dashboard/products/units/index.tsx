import DashboardLayout from "@/components/layouts/dashboard"
import AllUnits from "@/components/products/all-units"
import Head from "next/head"

const Units = () => {

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | واحد های اندازه گیری`}</title>
      </Head>

      <AllUnits title="لیست همه واحد های اندازه گیری" />

    </DashboardLayout>
  )

}

export default Units;