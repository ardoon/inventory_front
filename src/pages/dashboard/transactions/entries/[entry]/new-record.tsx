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

const NewRecord = () => {

    const router = useRouter();

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
        try {
            const result = await callApi().post(`/entries/records/${router.query.entry}`, records);
            if (result.data.records.length > 0) {
                toast.success('ثبت با موفقیت انجام شد')
                router.push(`/dashboard/transactions/entries/${router.query.entry}`)
            }
        } catch (err) {
            toast.error(`Error: ${err}`)
        }
    }

    return (
        <DashboardLayout>
            <Head>
                <title>{`SamCity | ثبت رکورد جدید`}</title>
            </Head>

            <SectionHeading title="ثبت رکورد جدید" backward />

            <form className="grid grid-cols-2 gap-4">

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

export default NewRecord;