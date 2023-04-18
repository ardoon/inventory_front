import DashboardLayout from "@/components/layouts/dashboard"
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

const Dashboard = () => {  

  const { t } = useTranslation(['dashboard'])

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ${ t('head') }`}</title>
      </Head>
      <div>
        
      </div>
    </DashboardLayout>
  )

}

export default Dashboard;