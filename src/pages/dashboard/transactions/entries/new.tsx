import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TextInput from "@/components/partials/dashboard/TextInput"
import Head from "next/head"
import DatePicker, { DateObject } from "react-multi-date-picker";
import jalali from "react-date-object/calendars/jalali"
import persian_fa from "react-date-object/locales/persian_fa"
import { FormEvent, useState } from "react"
import EntryRecordRowNew from "@/components/partials/table/entry-record-row-new";
import EntryRecordRow from "@/components/partials/table/entry-record-row";
import TextInputWithData from "@/components/partials/dashboard/TextInput-with-data";
import Record from "@/models/record";
import callApi from "@/helpers/callApi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import gregorian from "react-date-object/calendars/gregorian"
import gregorian_en from "react-date-object/locales/gregorian_en"

const NewEntry = () => {

  const router = useRouter();
  interface Entry {
    date: DateObject,
    receptNo: string,
    userId: number,
    warehouseId: number
  }

  const [entry, setEntry] = useState<Partial<Entry>>({
    date: new DateObject(),
    receptNo: new Date().getTime().toString(),
    userId: undefined,
    warehouseId: undefined
  });

  function setDate(val: DateObject) {
    setEntry({ ...entry, date: val });
  }

  function inputHandler(key: string, value: string | number) {
    setEntry({
      ...entry,
      [key]: value
    })
  }

  const [records, setRecords] = useState<Record[]>([]);

  function addRecord(record: any) {
    const joined = records.concat(record);
    setRecords(joined);
  }

  function updateRecord(no: number, record: Record) {
    setRecords(
      records.map((item, index) => {
        if (index === no) {
          return record;
        } else {
          return item
        }
      }) as Record[]
    )
  }

  function removeRecord(no: number) {
    let recs = records;
    recs = recs.filter((item, index) => index !== no)
    // setRecords(recs);
    setRecords(prev => (recs));
  }

  async function saveData(e: FormEvent) {
    e.preventDefault();
    if(entry.date && entry.receptNo && entry.userId && entry.warehouseId && records.length > 0) {
      try {
        const body = {
          entry: {
            date: (entry.date.convert(gregorian, gregorian_en).toDate()),
            receptNo: entry.receptNo,
            userId: +(entry.userId),
            warehouseId: +(entry.warehouseId)
          },
          records
        }        
        const result = await callApi().post('/entries', body);
        if(result.data.user.id && result.data.records.length > 0) {
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
        <title>{`SamCity | ثبت ورودی جدید`}</title>
      </Head>

      <SectionHeading title="ثبت ورودی جدید" backward />

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
            value={entry.date}
            onChange={(val: DateObject) => { setDate(val) }}
          />
        </div>

        <TextInput inputHandler={(val: string) => { setEntry({ ...entry, receptNo: val }) }} defaultValue={entry.receptNo} id="no" label="شماره رسید" colSpan={1} />
        <TextInputWithData inputHandler={inputHandler} id="userId" label="وارد کننده" colSpan={1} dataKey="users" />
        <TextInputWithData inputHandler={inputHandler} id="warehouseId" label="انبار" colSpan={1} dataKey="warehouses" />

        <table className="mt-10 text-sm col-span-2 border-separate border-spacing-2">
          <thead>
            <tr>
              <th>ردیف</th>
              <th>کالا</th>
              <th>مقدار</th>
              <th>واحد</th>
              <th>قیمت (ریال)</th>
              <th>توضیحات</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <EntryRecordRowNew add={addRecord} />
            {
              records?.map((record, index) => {
                return <EntryRecordRow update={updateRecord} remove={removeRecord} key={index} no={index} single={record} />
              })
            }
          </tbody>
        </table>

        <button onClick={(e) => saveData(e)} type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-md h-12 col-span-2 mt-4">ثبت</button>

      </form>

    </DashboardLayout>
  )

}

export default NewEntry;