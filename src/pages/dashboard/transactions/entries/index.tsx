import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TransactionsRow from "@/components/partials/dashboard/transactions-row"
import Head from "next/head"

const Entries = () => {

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ورودی ها`}</title>
      </Head>

      <section>

        <SectionHeading title="ورودی ها" backward={true} />

        <div className="space-y-6">
          
          <TransactionsRow type='entry'/>
          <TransactionsRow type='entry'/>
          <TransactionsRow type='entry'/>
          <TransactionsRow type='entry'/>
          <TransactionsRow type='entry'/>
          <TransactionsRow type='entry'/>
          <TransactionsRow type='entry'/>

        </div>
      </section>

    </DashboardLayout>
  )

}

export default Entries;