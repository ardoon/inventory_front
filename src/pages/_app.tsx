import '@/styles/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import { store } from './../store/store'
import { Provider } from 'react-redux'
import './../../i18n'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function App({ Component, pageProps }: AppProps) {

  const router = useRouter()

  const { i18n } = useTranslation()
  
  useEffect(() => {
    i18n.changeLanguage(router.locale)
  }, []);

  return (
    <Provider store={store} >
      <Component {...pageProps} />
    </Provider>
  )

}

export default appWithTranslation(App)
