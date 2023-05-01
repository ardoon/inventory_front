import DashboardLayout from "@/components/layouts/dashboard"
import RecentTransactionsRow from "@/components/partials/dashboard/recent-transactions-row"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import ShortcutBox from "@/components/partials/dashboard/shortcut-box"
import TransactionsRow from "@/components/partials/dashboard/transactions-row"
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

const Outgoes = () => {

  const { t } = useTranslation(['dashboard'])

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ورودی ها`}</title>
      </Head>

      <section>

        <SectionHeading title="خروجی ها" backward={true} />

        <div className="space-y-6">
          
          <TransactionsRow type='output'/>
          <TransactionsRow type='output'/>
          <TransactionsRow type='output'/>
          <TransactionsRow type='output'/>
          <TransactionsRow type='output'/>
          <TransactionsRow type='output'/>
          <TransactionsRow type='output'/>

        </div>
      </section>

    </DashboardLayout>
  )

}

export default Outgoes;