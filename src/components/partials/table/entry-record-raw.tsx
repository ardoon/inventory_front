import Link from "next/link";
import { useRouter } from "next/router";

export default function EntryRecordRaw({ record, no }: { record: any, no: number }) {

    const router = useRouter();

    return (
        <div className="flex items-center col-span-2 w-full h-16 bg-slate-900 rounded-md">

            <div className="grid grid-cols-12 flex-grow px-6 items-center">
                <div className="col-span-1">
                    <span className="text-sm text-gray-400">{no + 1}</span>
                </div>
                <div className="col-span-3">
                    <span className="text-sm text-blue-300">نام کالا: </span>
                    <span className="text-sm text-gray-400"> {record.product?.name}</span>
                </div>
                <div className="col-span-2">
                    <span className="text-sm text-blue-300">مقدار: </span>
                    <span className="text-sm text-gray-400"> {record.amount} {record.unit?.name}</span>
                </div>
                {/* <div className="col-span-2">
                    <span className="text-sm text-blue-300">واحد: </span>
                    <span className="text-sm text-gray-400"></span>
                </div> */}
                <div className="col-span-3">
                    <span className="text-sm text-blue-300">قیمت: </span>
                    <span className="text-sm text-gray-400">{record.price} ریال</span>
                </div>
                <div className="col-span-2">
                    <span className="text-sm text-blue-300">توضیحات: </span>
                    <span className="text-sm text-gray-400">{record.description}</span>
                </div>
                <div className="text-left col-span-1">
                    <Link href={`/dashboard/transactions/entries/${router.query.entry}/${record.id}`} className="text-gray-300 hover:text-indigo-400">مشاهده</Link>
                </div>
            </div>
        </div>

    )
}