import Link from "next/link";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

type inputProps = {
    type: string,
    outgo: any
}

export default function OutgoesRow(props: inputProps) {

    const date = new DateObject(props.outgo.date).convert(persian, persian_fa);    

    return (
        <div className="flex items-center w-full h-16 bg-slate-900 rounded-md">

            <div className="grid grid-cols-12 flex-grow px-6 items-center">
                <div className="col-span-3">
                    <span className="text-sm text-blue-300">تاریخ: </span>
                    <span className="text-sm text-gray-400">{props.outgo.date ? date.format() : 'ثبت نشده'}</span>
                </div>
                <div className="col-span-3">
                    <span className="text-sm text-blue-300">وارد کننده: </span>
                    <span className="text-sm text-gray-400">{props.outgo.user?.name}</span>
                </div>
                <div className="col-span-3">
                    <span className="text-sm text-blue-300">محل مصرف: </span>
                    <span className="text-sm text-gray-400">{props.outgo.section?.name}</span>
                </div>
                <div className="col-span-2">
                    <span className="text-sm text-blue-300">تعداد اقلام: </span>
                    <span className="text-sm text-gray-400">{props.outgo.records?.length ?? 0}</span>
                </div>
                <div className="text-left col-span-۱">
                    <Link href={`/dashboard/transactions/outgoes/${props.outgo.id}`} className="text-sm text-blue-500 hover:text-blue-400">مشاهده</Link>
                </div>
            </div>

        </div>
    )
}