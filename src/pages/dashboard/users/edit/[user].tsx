import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TextInput from "@/components/partials/dashboard/TextInput"
import TextInputDynamic from "@/components/partials/dashboard/TextInput-dynamic"
import User from "@/models/user"
import { deleteUser, updateUser } from "@/store/slices/usersSlice"
import { AppDispatch, RootState } from "@/store/store"
import Head from "next/head"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

const EditUser = () => {

  const { t } = useTranslation(['dashboard'])

  const access = [
    { name: 'مدیر', key: 'admin' },
    { name: 'انباردار', key: 'manager' },
    { name: 'عادی', key: 'normal' },
  ]

  const router = useRouter();

  const current = useSelector((state: RootState) => state.users.find((user) => user.id === router.query.user))

  const [user, setUser] = useState<User>(current as User);

  function getType(key: string) {
    let value: string = '';
    access.forEach(item => {
      if (item.key === key) {
        value = item.name
      }
    })
    return value
  }

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

  function update(e: FormEvent) {
    e.preventDefault();
    dispatch(updateUser(user));
    router.back();
  }
  
  function remove(e: FormEvent) {
    e.preventDefault();
    dispatch(deleteUser(user.id));
    router.back();
  }

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ${t('head.title', { context: 'products' })}`}</title>
      </Head>

      <SectionHeading title="ویرایش کاربر" />

      <form className="grid grid-cols-2 gap-4">

        <TextInputDynamic inputHandler={inputHandler} id="name" value={user.name} label="نام کاربر" colSpan={1} />
        <TextInputDynamic inputHandler={inputHandler} id="type" value={getType(user.type)} label="دسترسی" colSpan={1} data={access} />
        <TextInputDynamic inputHandler={inputHandler} id="role" value={user.role} label="نفش" colSpan={1} />
        <TextInputDynamic inputHandler={inputHandler} id="mobile" value={user.mobile} label="موبایل" colSpan={1} placeHolder='این فیلد اختیاری است' />

        <button onClick={(e) => update(e)} type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-md h-12 col-span-1 mt-4">ثبت تغییرات</button>
        <button onClick={(e) => remove(e)} type="submit" className="bg-rose-600 hover:bg-rose-700 rounded-md h-12 col-span-1 mt-4">حذف کاربر</button>

      </form>

      <form className="grid grid-cols-2 gap-4 mt-20">

        <TextInput id="password" label="گذرواژه" colSpan={1} />
        <TextInput id="confirmPassword" label="تکرار گذرواژه" colSpan={1} />

        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-md h-12 col-span-2 mt-4">تغییر گذرواژه</button>

      </form>

    </DashboardLayout>
  )

}

export default EditUser;