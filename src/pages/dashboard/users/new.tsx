import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TextInputDynamic from "@/components/partials/dashboard/TextInput-dynamic"
import User from "@/models/user"
import { addUser } from "@/store/slices/usersSlice"
import { AppDispatch } from "@/store/store"
import Head from "next/head"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { v4 as uuidv4 } from 'uuid';

const NewUser = () => {

  const { t } = useTranslation(['dashboard'])

  const router = useRouter();

  const access = [
    {name: 'مدیر', key: 'admin'},
    {name: 'انباردار', key: 'manager'},
    {name: 'عادی', key: 'normal'},
  ]

  const [user, setUser] = useState<User>({
    id: uuidv4(),
    name: '',
    type: 'normal',
    role: '',
    mobile: undefined
  });

  function inputHandler(key: string, value: string | number) {
    
    if (key === 'type') {
      access.forEach((item) => {
        if(item.name === value) {
          value = item.key
        }
      })
    }

    setUser({
      ...user,
      [key]: value
    })
  }

  const dispatch = useDispatch<AppDispatch>();

  function add(e: FormEvent) {
    e.preventDefault();
    dispatch(addUser(user))
    router.back();
  }

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ${t('head.title', { context: 'products' })}`}</title>
      </Head>

      <SectionHeading title="افزودن کاربر" backward />

      <form className="grid grid-cols-2 gap-4">

        <TextInputDynamic inputHandler={inputHandler} id="name" label="نام کاربر" colSpan={1} />
        <TextInputDynamic inputHandler={inputHandler} id="type" label="دسترسی" colSpan={1} data={access} />
        <TextInputDynamic inputHandler={inputHandler} id="role" label="نفش" colSpan={1} />
        <TextInputDynamic inputHandler={inputHandler} id="mobile" label="موبایل" colSpan={1} placeHolder='این فیلد اختیاری است' />

        <button onClick={(e) => add(e)} type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-md h-12 col-span-2 mt-4">ایجاد کاربر</button>

      </form>

    </DashboardLayout>
  )

}

export default NewUser;