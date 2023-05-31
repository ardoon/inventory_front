import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TextInput from "@/components/partials/dashboard/TextInput"
import TextInputDynamic from "@/components/partials/dashboard/TextInput-dynamic"
import callApi from "@/helpers/callApi"
import User from "@/models/user"
import Head from "next/head"
import { useRouter } from "next/router"
import { FormEvent, useEffect, useState } from "react"

const EditUser = () => {

  const access = [
    { name: 'مدیر', key: 'admin' },
    { name: 'انباردار', key: 'manager' },
    { name: 'عادی', key: 'normal' },
  ]

  const router = useRouter();

  const [user, setUser] = useState<Partial<User> | undefined>();

  useEffect(() => {
    callApi().get(`/users/${router.query.user}`).then((res) => {
      setUser(res.data);
    });
  },[]);


  function getType(key: string | undefined) {
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

  async function update(e: FormEvent) {
    e.preventDefault();
    try {
      await callApi().patch(`/users/${router.query.user}`, user)
      router.push('/dashboard/users')
    } catch (err) {
      console.log(err);
    }
    router.back();
  }
  
  async function remove(e: FormEvent) {
    e.preventDefault();
    try {
      await callApi().delete(`/users/${router.query.user}`)
      router.push('/dashboard/users')
    } catch (err) {
      console.log(err);
    }
    router.back();
  }

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ویرایش کاربر`}</title>
      </Head>

      <SectionHeading title="ویرایش کاربر" backward />

      <form className="grid grid-cols-2 gap-4">

        <TextInputDynamic inputHandler={inputHandler} id="name" value={user?.name} label="نام کاربر" colSpan={1} />
        <TextInputDynamic inputHandler={inputHandler} id="type" value={getType(user?.type)} label="دسترسی" colSpan={1} data={access} />
        <TextInputDynamic inputHandler={inputHandler} id="role" value={user?.role} label="نفش" colSpan={1} />
        <TextInputDynamic inputHandler={inputHandler} id="mobile" value={user?.mobile} label="موبایل" colSpan={1} placeHolder='این فیلد اختیاری است' />

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