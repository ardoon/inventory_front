import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TransactionsRow from "@/components/partials/dashboard/transactions-row"
import Head from "next/head"

const Outgoes = () => {

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