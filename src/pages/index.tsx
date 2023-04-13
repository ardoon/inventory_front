import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'


export async function getStaticProps({ locale }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
      ])),
    },
  }
}

export default function Home() {

  const { t } = useTranslation('common')

  const {locale} = useRouter()

  const fontClass = `${locale === 'fa' ? 'font-irsans' : ''} ${locale === 'ckb' ? 'font-rudaw' : ''}`

  return (
    <main className={`p-24 rtl:bg-slate-400 ${fontClass}`}>
      <h1>{t('welcome')}</h1>
    </main>
  )
}
