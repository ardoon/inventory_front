import Link from "next/link";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

type inputProps = {
    type: string,
    entry: any
}

export default function EntriesRow(props: inputProps) {

    const date = new DateObject(props.entry.date).convert(persian, persian_fa);    

    return (
        <div className="flex items-center w-full h-16 bg-slate-900 rounded-md">

            <div className="grid grid-cols-12 flex-grow px-6 items-center">
                <div className="col-span-2">
                    <span className="text-sm text-blue-300">تاریخ: </span>
                    <span className="text-sm text-gray-400">{props.entry.date ? date.format() : 'ثبت نشده'}</span>
                </div>
                <div className="col-span-2">
                    <span className="text-sm text-blue-300">وارد کننده: </span>
                    <span className="text-sm text-gray-400">{props.entry.user?.name}</span>
                </div>
                <div className="col-span-2">
                    <span className="text-sm text-blue-300">انبار: </span>
                    <span className="text-sm text-gray-400">{props.entry.warehouse?.name}</span>
                </div>
                <div className="col-span-3">
                    <span className="text-sm text-blue-300">شماره رسید: </span>
                    <span className="text-sm text-gray-400">{props.entry.receptNo}</span>
                </div>
                <div className="col-span-2">
                    <span className="text-sm text-blue-300">تعداد اقلام: </span>
                    <span className="text-sm text-gray-400">{props.entry.records?.length ?? 0}</span>
                </div>
                <div className="text-left col-span-1">
                    <Link href={`/dashboard/transactions/entries/${props.entry.id}`} className="text-sm text-blue-500 hover:text-blue-400">مشاهده</Link>
                </div>
            </div>

        </div>
    )
}