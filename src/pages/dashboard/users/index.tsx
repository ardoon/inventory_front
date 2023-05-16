import DashboardLayout from "@/components/layouts/dashboard"
import AllUsers from "@/components/users/all-users"
import Head from "next/head"

const Users = () => {

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | کاربران`}</title>
      </Head>

      <AllUsers />

    </DashboardLayout>
  )

}

export default Users;