import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import AuthLayout from '@/components/layouts/auth'
import AuthInput from '@/components/partials/form-elements/auth-input'
import callApi from '@/helpers/callApi'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const Home = () => {

  const { t } = useTranslation(['auth', 'errorMessages'])

  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if(username === "" || password === "") {
      toast.warning('لطفا اطلاعات را وارد کنید')
    } else {
      try {
        const res = await callApi().post('/auth/login', {
          "mobile": username,
          "password": password
        })
        if(res.data.id) {
          router.push('/dashboard')
          toast.success('تبریک! با موفقیت وارد شدید')
        }
      } catch (error: any) {
        if(error.code === 'ERR_BAD_REQUEST') {
          toast.error('اطلاعات وارد شده صحیح نیست')
        }
      }
    }
  }

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <AuthLayout>
      <Head>
        <title>{`SamCity | ${t('login.head')}`}</title>
      </Head>
      <section className='lg:w-5/12 md:w-2/3 sm:w-full mx-auto h-3 pt-28'>

        <header className='text-center'>
          <h1 className='text-4xl font-bold'>{t('login.title')}</h1>
          <h2 className='mt-6 text-sm text-gray-400'>{t('login.description')}</h2>
        </header>

        <section className='mt-12'>
          <form className='space-y-6'>

            <AuthInput
              id='username'
              label={t('login.input', { context: 'username' })}
              type='text' inputHandler={(value: string) => setUsername(value)} t={t}/>

            <AuthInput
              id='password'
              label={t('login.input', { context: 'password' })}
              type='password' inputHandler={(value: string) => setPassword(value)} t={t}/>

            <div className='flex justify-start w-2/3 mx-auto space-y-2'>
              <label className='text-slate-300 text-sm order-last self-center pt-2' htmlFor='remember'>{t('login.input', { context: 'remember' })}</label>
              <input type="checkbox" id='remember' className='bg-slate-900 border-0 focus-within:hidden rounded-md rtl:ml-2 ltr:mr-2 w-5 h-5' />
            </div>
            <div className='w-2/3 mx-auto'>
              <button type='submit' onClick={e => handleSubmit(e)} className='bg-indigo-600 w-full h-12 rounded-md'>{t('login.input', { context: 'submitBtn' })}</button>
            </div>

            {/* <div className='w-2/3 mx-auto'>
              <a href="#" className='text-sm text-slate-500 hover:text-indigo-400'>{t('login.forgotPassword')}</a>
            </div> */}

          </form>
        </section>

      </section>
    </AuthLayout>
  )
}

export default Home;
