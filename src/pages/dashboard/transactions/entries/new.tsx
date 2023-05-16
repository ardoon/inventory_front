import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TextInput from "@/components/partials/dashboard/TextInput"
import Head from "next/head"
import DatePicker from "react-multi-date-picker";
import jalali from "react-date-object/calendars/jalali"
import persian_fa from "react-date-object/locales/persian_fa"
import { useEffect, useState } from "react"

const NewEntry = () => {

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }


  const units = [
    'متر',
    'کلیوگرم',
    'بسته',
    'کیسه',
    'عدد'
  ]

  const warehouses = [
    'west',
    'east',
    'north',
    'south'
  ]

  const users = [
    'aran',
    'shaho',
    'ramin'
  ]

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ثبت ورودی جدید`}</title>
      </Head>

      <SectionHeading title="ثبت ورودی جدید" backward={true} />

      <form className="grid grid-cols-2 gap-4">

        <div className={`col-span-1 space-y-2`}>
          <label className='text-slate-300 text-sm block' htmlFor=''>تاریخ</label>
          <DatePicker
            calendar={jalali}
            locale={persian_fa}
            className="custom-calendar"
            inputClass={`h-12 border-0 text-slate-300 text-sm w-full rounded-md block bg-slate-800 focus:ring-0 px-4`}
            containerStyle={{ width: "100%", paddingTop: "5px" }}
            calendarPosition="bottom-right"
          />
        </div>

        <TextInput id="no" label="شماره رسید" colSpan={1} />
        <TextInput id="user" label="وارد کننده" colSpan={1} data={users} />
        <TextInput id="warehouse" label="انبار" colSpan={1} data={warehouses} />

        <table className="mt-10 text-sm col-span-2 border-separate border-spacing-2">
          <tr className="">
            <th>ردیف</th>
            <th>کالا</th>
            <th>مقدار</th>
            <th>واحد</th>
            <th>قیمت (ریال)</th>
            <th>توضیحات</th>
            <th></th>
          </tr>
          <tr className="space-x-2">
            <td className="flex items-center h-10 justify-center">1</td>
            <td><input type='text' className="bg-slate-800 border-none rounded-sm w-full" /></td>
            <td><input type='text' className="bg-slate-800 border-none rounded-sm w-full" /></td>
            <td><input type='text' className="bg-slate-800 border-none rounded-sm w-full" /></td>
            <td><input type='text' className="bg-slate-800 border-none rounded-sm w-full" /></td>
            <td><input type='text' className="bg-slate-800 border-none rounded-sm w-full" /></td>
            <td className="pt-1"><i className="bi bi-trash3 cursor-pointer text-rose-400"></i></td>
          </tr>
          <tr className="space-x-2">
            <td className="flex items-center h-10 justify-center">2</td>
            <td><input type='text' className="bg-slate-800 border-none rounded-sm w-full" /></td>
            <td><input type='text' className="bg-slate-800 border-none rounded-sm w-full" /></td>
            <td><input type='text' className="bg-slate-800 border-none rounded-sm w-full" /></td>
            <td><input type='text' className="bg-slate-800 border-none rounded-sm w-full" /></td>
            <td><input type='text' className="bg-slate-800 border-none rounded-sm w-full" /></td>
            <td className="pt-1 text-2xl cursor-pointer">+</td>
          </tr>
        </table>

        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-md h-12 col-span-2 mt-4">ثبت</button>

      </form>

    </DashboardLayout>
  )

}

export default NewEntry;