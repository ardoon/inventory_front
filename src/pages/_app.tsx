import '@/styles/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import { store } from './../store/store'
import { Provider } from 'react-redux'

function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store} >
      <Component {...pageProps} />
    </Provider>
  )

}

export default appWithTranslation(App)
