import '@/styles/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import { store } from './../store/store'
import { Provider } from 'react-redux'
import './../../i18n'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App({ Component, pageProps }: AppProps) {

  const router = useRouter()

  const { i18n } = useTranslation()
  
  useEffect(() => {
    i18n.changeLanguage(router.locale)
  }, []);

  return (
    <Provider store={store} >
      <Component {...pageProps} />
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Provider>
  )

}

export default appWithTranslation(App)
