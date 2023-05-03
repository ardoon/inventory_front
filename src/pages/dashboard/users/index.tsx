import DashboardLayout from "@/components/layouts/dashboard"
import AllUsers from "@/components/users/all-users"
import Head from "next/head"
import { useTranslation } from "react-i18next"

const Users = () => {

  const { t } = useTranslation(['dashboard'])

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ${t('head.title', { context: 'products' })}`}</title>
      </Head>

      <AllUsers />

    </DashboardLayout>
  )

}

export default Users;