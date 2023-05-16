import DashboardLayout from "@/components/layouts/dashboard"
import Sections from "@/components/sections/sections"
import Head from "next/head"

const AllSections = () => {

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | بخش ها`}</title>
      </Head>

      <Sections />

    </DashboardLayout>
  )

}

export default AllSections;