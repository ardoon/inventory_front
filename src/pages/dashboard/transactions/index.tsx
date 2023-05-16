import DashboardLayout from "@/components/layouts/dashboard"
import RecentTransactionsRow from "@/components/partials/dashboard/recent-transactions-row"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import ShortcutBox from "@/components/partials/dashboard/shortcut-box"
import Head from "next/head"

const Transactions = () => {

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | تراکنش ها`}</title>
      </Head>

      <header className="h-48 grid grid-cols-4 gap-6 mb-10">

        <ShortcutBox label='ثبت ورود به انبار' icon='plus-square' link='/dashboard/transactions/entries/new' />
        <ShortcutBox label='لیست ورود ها' icon='file-arrow-down' link='/dashboard/transactions/entries' />
        <ShortcutBox label='ثبت خروج از انبار' icon='escape' link='/dashboard/transactions/outgoes/new' />
        <ShortcutBox label='لیست خروج ها' icon='file-arrow-up' link='/dashboard/transactions/outgoes' />

      </header>

      <section>

        <SectionHeading title="تراکنش های اخیر" />

        <div className="space-y-6">
          
          <RecentTransactionsRow type='entry' />
          <RecentTransactionsRow type='output' />
          <RecentTransactionsRow type='entry' />
          <RecentTransactionsRow type='output' />
          <RecentTransactionsRow type='output' />

        </div>
      </section>

    </DashboardLayout>
  )

}

export default Transactions;