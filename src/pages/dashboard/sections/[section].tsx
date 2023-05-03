import DashboardLayout from "@/components/layouts/dashboard"
import Sections from "@/components/sections/sections"
import Head from "next/head"
import { useTranslation } from "react-i18next"

const Section = () => {

  const { t } = useTranslation(['dashboard'])

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ${t('head.title', { context: 'products' })}`}</title>
      </Head>

      <Sections title="زیر دسته های ..." />

    </DashboardLayout>
  )

}

export default Section;