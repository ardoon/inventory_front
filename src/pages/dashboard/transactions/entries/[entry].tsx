import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TextInput from "@/components/partials/dashboard/TextInput"
import Head from "next/head"
import DatePicker, { DateObject } from "react-multi-date-picker";
import jalali from "react-date-object/calendars/jalali"
import { FormEvent, useEffect, useState } from "react"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import TextInputWithData from "@/components/partials/dashboard/TextInput-with-data";
import callApi from "@/helpers/callApi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import gregorian from "react-date-object/calendars/gregorian"
import gregorian_en from "react-date-object/locales/gregorian_en"
import EntryRecordRaw from "@/components/partials/table/entry-record-raw"
import useSWR from 'swr'
import Record from "@/models/record";
import Entry from "@/models/entry";

const EditEntry = () => {

  const router = useRouter();

  const [entry, setEntry] = useState<Partial<Entry> | undefined>();

  useEffect(() => {
    if (router.query.entry) {
      callApi().get(`/entries/${router.query.entry}`).then((res) => {
        setEntry({
          date: new DateObject(res.data.date).convert(persian, persian_fa),
          receptNo: res.data.receptNo,
          userId: res.data.user.id,
          userName: res.data.user.name,
          warehouseId: res.data.warehouse.id,
          warehouseName: res.data.warehouse.name,
          records: res.data.records
        });
      });
    }
  }, [router.query.entry]);

  function setDate(val: DateObject) {
    setEntry({ ...entry, date: val });
  }

  function inputHandler(key: string, value: string | number, content: string) {
    if (key === 'userId') {
      setEntry({
        ...entry,
        [key]: +value,
        'userName': content
      })
    } else if (key === 'warehouseId') {
      setEntry({
        ...entry,
        [key]: +value,
        'warehouseName': content
      })
    } else {
      setEntry({
        ...entry,
        [key]: value
      })
    }

  }

  async function saveData(e: FormEvent) {
    e.preventDefault();
    if (entry?.date && entry?.receptNo && entry?.userId && entry?.warehouseId) {
      try {
        const body = {
          entry: {
            date: (entry?.date?.convert(gregorian, gregorian_en).toDate()),
            receptNo: entry.receptNo,
            userId: +(entry.userId),
            warehouseId: +(entry.warehouseId)
          }
        }
        const result = await callApi().patch(`/entries/${router.query.entry}`, body.entry);
        if (result.data.userId) {
          toast.success('ثبت ورود با موفقیت انجام شد')
          router.push('/dashboard/transactions/entries')
        }
      } catch (err) {
        toast.error(`Error: ${err}`)
      }
    }
  }

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ویرایش ورودی`}</title>
      </Head>

      <SectionHeading title="ویرایش ورودی" backward />

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
            value={entry?.date}
            onChange={(val: DateObject) => { setDate(val) }}
          />
        </div>

        <TextInput inputHandler={(val: string) => { setEntry({ ...entry, receptNo: val }) }} value={entry?.receptNo} id="no" label="شماره رسید" colSpan={1} />
        <TextInputWithData value={entry?.userName} inputHandler={inputHandler} id="userId" label="وارد کننده" colSpan={1} dataKey="users" />
        <TextInputWithData value={entry?.warehouseName} inputHandler={inputHandler} id="warehouseId" label="انبار" colSpan={1} dataKey="warehouses" />
        <button onClick={(e) => saveData(e)} type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-md h-12 col-span-2 mt-6 mb-10">ذخیره</button>

        <SectionHeading title="لیست اقلام" />
        {
          entry?.records?.map((record: Record, index: number) => {
            return <EntryRecordRaw key={index} no={index} record={record} />
          })
        }

      </form>

    </DashboardLayout>
  )

}

export default EditEntry;