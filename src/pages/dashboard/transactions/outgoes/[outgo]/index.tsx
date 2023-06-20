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
import Record from "@/models/record";
import DeleteConfirmation from "@/components/partials/dashboard/deleteConfirmation";
import Outgo from "@/models/outgo";
import OutgoRecordRaw from "@/components/partials/table/outgo-record-raw";

const EditOutgo = () => {

  const router = useRouter();

  const [outgo, setOutgo] = useState<Partial<Outgo> | undefined>();

  useEffect(() => {
    if (router.query.outgo) {
      callApi().get(`/outgoes/${router.query.outgo}`).then((res) => {
        setOutgo({
          date: new DateObject(res.data.date).convert(persian, persian_fa),
          receptNo: res.data.receptNo,
          userId: res.data.user.id,
          userName: res.data.user.name,
          sectionId: res.data.section.id,
          sectionName: res.data.section.name,
          records: res.data.records
        });
      });
    }
  }, [router.query.outgo]);

  function setDate(val: DateObject) {
    setOutgo({ ...outgo, date: val });
  }

  function inputHandler(key: string, value: string | number, content: string) {
    if (key === 'userId') {
      setOutgo({
        ...outgo,
        [key]: +value,
        'userName': content
      })
    } else if (key === 'sectionId') {
      setOutgo({
        ...outgo,
        [key]: +value,
        'sectionName': content
      })
    } else {
      setOutgo({
        ...outgo,
        [key]: value
      })
    }

  }

  async function saveData(e: FormEvent) {
    e.preventDefault();
    if (outgo?.date && outgo?.receptNo && outgo?.userId && outgo?.sectionId) {
      try {
        const body = {
          outgo: {
            date: (outgo?.date?.convert(gregorian, gregorian_en).toDate()),
            receptNo: outgo.receptNo,
            userId: +(outgo.userId),
            sectionId: +(outgo.sectionId)
          }
        }
        const result = await callApi().patch(`/outgoes/${router.query.outgo}`, body.outgo);
        if (result.data.userId) {
          toast.success('ثبت خروج با موفقیت انجام شد')
          router.push('/dashboard/transactions/outgoes')
        }
      } catch (err) {
        toast.error(`Error: ${err}`)
      }
    }
  }

  const deleteOutgoHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await callApi().delete(`/outgoes/${router.query.outgo}`)
      toast.warning('خروجی مورد نظر حذف شد')
      router.push('/dashboard/transactions/outgoes')
    } catch (err:any) {
      setShowModal(false)
      toast.error(err.data);
      console.log(err);
    }

  }

  const setShowModal = (show = true) => {
    router.push(`/dashboard/transactions/outgoes/${router.query.outgo}/${show ? '?confirm' : ''}`)
  }

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ویرایش خروجی`}</title>
      </Head>

      <SectionHeading title="ویرایش خروجی" backward />

      <form className="grid grid-cols-2 gap-4">

        {
          'confirm' in router.query && <DeleteConfirmation title="حذف خروجی" description="خروجی" handleTrue={deleteOutgoHandler} handleCancel={() => setShowModal(false)} />
        }

        <div className={`col-span-1 space-y-2`}>
          <label className='text-slate-300 text-sm block' htmlFor=''>تاریخ</label>
          <DatePicker
            calendar={jalali}
            locale={persian_fa}
            className="custom-calendar"
            inputClass={`h-12 border-0 text-slate-300 text-sm w-full rounded-md block bg-slate-800 focus:ring-0 px-4`}
            containerStyle={{ width: "100%", paddingTop: "5px" }}
            calendarPosition="bottom-right"
            value={outgo?.date}
            onChange={(val: DateObject) => { setDate(val) }}
          />
        </div>

        <TextInput inputHandler={(val: string) => { setOutgo({ ...outgo, receptNo: val }) }} value={outgo?.receptNo} id="no" label="شماره رسید" colSpan={1} />
        <TextInputWithData value={outgo?.userName} inputHandler={inputHandler} id="userId" label="وارد کننده" colSpan={1} dataKey="users" />
        <TextInputWithData value={outgo?.sectionName} inputHandler={inputHandler} id="sectionId" label="مصرف کننده" colSpan={1} dataKey="sections" />

        <div className="col-span-2 grid grid-cols-5 gap-4">
          <button onClick={(e) => saveData(e)} type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-md h-12 col-span-3 mt-6 mb-10">ذخیره</button>
          <span
            onClick={() => { router.push(`/dashboard/transactions/outgoes/${router.query.outgo}/new-record`) }}
            className="bg-indigo-600 cursor-pointer flex items-center justify-center hover:bg-indigo-700 rounded-md h-12 col-span-1 mt-6 mb-10">
            افزودن کالا
          </span>
          <span onClick={() => setShowModal(true)} className="bg-rose-600 cursor-pointer flex items-center justify-center hover:bg-rose-700 rounded-md h-12 col-span-1 mt-6 mb-10">حذف</span>
        </div>


        <SectionHeading title="لیست اقلام" />
        {
          outgo?.records?.map((record: Record, index: number) => {
            return <OutgoRecordRaw key={index} no={index} record={record} />
          })
        }

      </form>

    </DashboardLayout>
  )

}

export default EditOutgo;