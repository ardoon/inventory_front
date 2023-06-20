import DashboardLayout from "@/components/layouts/dashboard"
import EntriesRow from "@/components/partials/dashboard/entries-row"
import OutgoesRow from "@/components/partials/dashboard/outgoes-row"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TransactionsRow from "@/components/partials/dashboard/transactions-row"
import callApi from "@/helpers/callApi"
import Head from "next/head"
import useSWR from 'swr'

const Outgoes = () => {

  const { data, error } = useSWR({ url: '/dashboard/transactions/outgoes' }, async () => {
    return (await callApi().get('/outgoes')).data;
  })
  const loadingItems = !data && !error;

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | خروج ها`}</title>
      </Head>

      <section>

        <SectionHeading title="خروج ها" backward={true} />

        <div className="space-y-6">

          {
            loadingItems ? <p>Loading...</p> : data.map((item: any) => {
              return <OutgoesRow key={item.id} type='entry' outgo={item} />
            })
          }
          

        </div>
      </section>

    </DashboardLayout>
  )

}

export default Outgoes;