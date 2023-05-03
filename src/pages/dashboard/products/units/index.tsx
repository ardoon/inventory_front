import DashboardLayout from "@/components/layouts/dashboard"
import AllUnits from "@/components/products/all-units"
import Head from "next/head"
import { useTranslation } from "react-i18next"

const Units = () => {

  const { t } = useTranslation(['dashboard'])

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ${t('head.title', { context: 'products' })}`}</title>
      </Head>

      <AllUnits title="لیست همه واحد های اندازه گیری" />

    </DashboardLayout>
  )

}

export default Units;