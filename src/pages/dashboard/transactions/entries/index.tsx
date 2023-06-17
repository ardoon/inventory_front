import DashboardLayout from "@/components/layouts/dashboard"
import EntriesRow from "@/components/partials/dashboard/entries-row"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TransactionsRow from "@/components/partials/dashboard/transactions-row"
import callApi from "@/helpers/callApi"
import Head from "next/head"
import useSWR from 'swr'

const Entries = () => {

  const { data, error } = useSWR({ url: '/dashboard/transactions/entries' }, async () => {
    return (await callApi().get('/entries')).data;
  })
  const loadingItems = !data && !error;

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ورودی ها`}</title>
      </Head>

      <section>

        <SectionHeading title="ورودی ها" backward={true} />

        <div className="space-y-6">

          {
            loadingItems ? <p>Loading...</p> : data.map((item: any) => {
              return <EntriesRow key={item.id} type='entry' entry={item} />
            })
          }
          

        </div>
      </section>

    </DashboardLayout>
  )

}

export default Entries;