import DashboardLayout from "@/components/layouts/dashboard"
import AllWarehouses from "@/components/warehouses/all-warehouses"
import Head from "next/head"
import { useTranslation } from "react-i18next"

const Warehouses = () => {

  const { t } = useTranslation(['dashboard'])

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ${t('head.title', { context: 'products' })}`}</title>
      </Head>

      <AllWarehouses title="لیست همه انبارها" />

    </DashboardLayout>
  )

}

export default Warehouses;