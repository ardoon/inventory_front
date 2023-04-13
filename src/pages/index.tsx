import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { NextPageWithLayout } from './_app'
import { ReactElement } from 'react'
import Head from 'next/head'
import DashboardLayout from '@/components/layouts/dashboard'


export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'auth',
      ])),
    },
  }
}

const Home: NextPageWithLayout = () => {
  
  const { t } = useTranslation('auth')

  return (
    <>
      <Head>
        <title>SamCity | {t('login.header')}</title>
      </Head>
      <h1>{t('login.header')}</h1>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

export default Home;
