import Link from "next/link";

type inputProps = {
    type: string,
}

export default function TransactionsRow(props: inputProps) {

    return (
        <div className="flex items-center w-full h-16 bg-slate-900 rounded-md">

            <div className="grid grid-cols-12 flex-grow px-6 items-center">
                <div className="col-span-3">
                    <span className="text-sm text-blue-300">تاریخ: </span>
                    <span className="text-sm text-gray-400">22 اردیبهشت ۱۴۰۲</span>
                </div>
                <div className="col-span-3">
                    <span className="text-sm text-blue-300">{props.type === 'entry' ? 'وارد کننده' : 'خارج کننده'}: </span>
                    <span className="text-sm text-gray-400">عبدالمالک ریگی ابن خالد</span>
                </div>
                <div className="col-span-3">
                    <span className="text-sm text-blue-300">شماره رسید: </span>
                    <span className="text-sm text-gray-400">۱۲۳۴۵۶۷</span>
                </div>
                <div className="col-span-2">
                    <span className="text-sm text-blue-300">تعداد اقلام: </span>
                    <span className="text-sm text-gray-400">۵</span>
                </div>
                <div className="text-left col-span-1">
                    <Link href='/' className="text-sm text-blue-500 hover:text-blue-400">مشاهده</Link>
                </div>
            </div>

        </div>
    )
}