import Link from "next/link";

type PropsType = {
    name: string,
    primaryUnit: string,
    secondaryUnit: string,
    amount: number,
    link: string
}

export default function ProductItem({ name, primaryUnit, secondaryUnit, amount, link }: PropsType ) {

    return (
        <div className="flex items-center w-full h-16 bg-slate-900 rounded-md">

            <div className="grid grid-cols-12 flex-grow px-6 items-center">
                <div className="col-span-3">
                    <span className="text-sm text-blue-300">نام کالا: </span>
                    <span className="text-sm text-gray-400">{name}</span>
                </div>
                <div className="col-span-2">
                    <span className="text-sm text-blue-300">واحد اصلی: </span>
                    <span className="text-sm text-gray-400">{primaryUnit}</span>
                </div>
                <div className="col-span-2">
                    <span className="text-sm text-blue-300">واحد ثانویه: </span>
                    <span className="text-sm text-gray-400">{secondaryUnit}</span>
                </div>
                <div className="col-span-2">
                    <span className="text-sm text-blue-300">موجودی: </span>
                    <span className="text-sm text-gray-400">{amount}</span>
                </div>
                <div className="text-left col-span-3">
                    <Link href={link} className="text-gray-300 hover:text-indigo-400">مشاهده</Link>
                </div>
            </div>

        </div>
    )
}