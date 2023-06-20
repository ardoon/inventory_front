import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TextInput from "@/components/partials/dashboard/TextInput"
import Head from "next/head"
import DatePicker, { DateObject } from "react-multi-date-picker";
import jalali from "react-date-object/calendars/jalali"
import persian_fa from "react-date-object/locales/persian_fa"
import { FormEvent, useState } from "react"
import TextInputWithData from "@/components/partials/dashboard/TextInput-with-data";
import Record from "@/models/record";
import callApi from "@/helpers/callApi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import gregorian from "react-date-object/calendars/gregorian"
import gregorian_en from "react-date-object/locales/gregorian_en"
import OutgoRecordRowNew from "@/components/partials/table/outgo-record-row-new";
import OutgoRecordRow from "@/components/partials/table/outgo-record-row";
import OutgoRecord from "@/models/outgoRecord";

const NewOutgo = () => {

  const router = useRouter();
  interface Section {
    date: DateObject,
    receptNo: string,
    userId: number,
    sectionId: number
  }

  const [outgo, setOutgo] = useState<Partial<Section>>({
    date: new DateObject(),
    receptNo: new Date().getTime().toString(),
    userId: undefined,
    sectionId: undefined
  });

  function setDate(val: DateObject) {
    setOutgo({ ...outgo, date: val });
  }

  function inputHandler(key: string, value: string | number) {
    setOutgo({
      ...outgo,
      [key]: value
    })
  }

  const [records, setRecords] = useState<OutgoRecord[]>([]);

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
      }) as OutgoRecord[]
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
    if(outgo.date && outgo.receptNo && outgo.userId && outgo.sectionId && records.length > 0) {
      try {
        const body = {
          outgo: {
            date: (outgo.date.convert(gregorian, gregorian_en).toDate()),
            receptNo: outgo.receptNo,
            userId: +(outgo.userId),
            sectionId: +(outgo.sectionId)
          },
          records
        }        
        const result = await callApi().post('/outgoes', body);
        if(result.data.user.id && result.data.records.length > 0) {
          toast.success('ثبت خروج با موفقیت انجام شد')
          router.push('/dashboard/transactions/outgoes')
        }
      } catch (err) {
        toast.error(`Error: ${err}`)
      }
    }
  }

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ثبت خروج جدید`}</title>
      </Head>

      <SectionHeading title="ثبت خروج جدید" backward />

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
            value={outgo.date}
            onChange={(val: DateObject) => { setDate(val) }}
          />
        </div>

        <TextInput inputHandler={(val: string) => { setOutgo({ ...outgo, receptNo: val }) }} defaultValue={outgo.receptNo} id="no" label="شماره رسید" colSpan={1} />
        <TextInputWithData inputHandler={inputHandler} id="userId" label="خارج کننده" colSpan={1} dataKey="users" />
        <TextInputWithData inputHandler={inputHandler} id="sectionId" label="محل مصرف" colSpan={1} dataKey="sections" />

        <table className="mt-10 text-sm col-span-2 border-separate border-spacing-2">
          <thead>
            <tr>
              <th>ردیف</th>
              <th>کالا</th>
              <th>مقدار</th>
              <th>واحد</th>
              <th>توضیحات</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <OutgoRecordRowNew add={addRecord} />
            {
              records?.map((record, index) => {
                return <OutgoRecordRow update={updateRecord} remove={removeRecord} key={index} no={index} single={record} />
              })
            }
          </tbody>
        </table>

        <button onClick={(e) => saveData(e)} type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-md h-12 col-span-2 mt-4">ثبت</button>

      </form>

    </DashboardLayout>
  )

}

export default NewOutgo;