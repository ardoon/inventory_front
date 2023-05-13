import DashboardLayout from "@/components/layouts/dashboard"
import SubSections from "@/components/sections/sub-section"
import Head from "next/head"
import { useTranslation } from "react-i18next"

const Section = () => {

  const { t } = useTranslation(['dashboard'])

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ${t('head.title', { context: 'products' })}`}</title>
      </Head>

      <SubSections />

    </DashboardLayout>
  )

}

export default Section;