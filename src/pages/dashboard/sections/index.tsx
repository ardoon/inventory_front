import DashboardLayout from "@/components/layouts/dashboard"
import Sections from "@/components/sections/sections"
import Head from "next/head"
import { useTranslation } from "react-i18next"

const AllSections = () => {

  const { t } = useTranslation(['dashboard'])

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ${t('head.title', { context: 'products' })}`}</title>
      </Head>

      <Sections />

    </DashboardLayout>
  )

}

export default AllSections;