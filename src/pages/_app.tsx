import '@/styles/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {

  return <Component {...pageProps} />
  
}

export default appWithTranslation(App)
