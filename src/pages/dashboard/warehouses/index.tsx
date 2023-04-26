import DashboardLayout from "@/components/layouts/dashboard"
import AllWarehouses from "@/components/warehouses/all-warehouses"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { useTranslation } from "react-i18next"

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'sidebar',
        'dashboard',
      ])),
    },
  }
}

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