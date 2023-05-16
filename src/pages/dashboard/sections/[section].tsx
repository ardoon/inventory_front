import DashboardLayout from "@/components/layouts/dashboard"
import SubSections from "@/components/sections/sub-section"
import Head from "next/head"

const Section = () => {

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | زیر بخش ها`}</title>
      </Head>

      <SubSections />

    </DashboardLayout>
  )

}

export default Section;