import Link from "next/link";

type PropsType = {
    name: string,
    access: string,
    role: string,
    phone: string,
    link: string
}

export default function UserItem({ name, access, role, phone, link }: PropsType ) {

    return (
        <div className="flex items-center w-full h-16 bg-slate-900 rounded-md">

            <div className="grid grid-cols-12 flex-grow px-6 items-center">
                <div className="col-span-3">
                    <span className="text-sm text-blue-300">نام کاربر: </span>
                    <span className="text-sm text-gray-400">{name}</span>
                </div>
                <div className="col-span-2">
                    <span className="text-sm text-blue-300">دسترسی: </span>
                    <span className="text-sm text-gray-400">{access}</span>
                </div>
                <div className="col-span-2">
                    <span className="text-sm text-blue-300">نقش: </span>
                    <span className="text-sm text-gray-400">{role}</span>
                </div>
                <div className="col-span-2">
                    <span className="text-sm text-blue-300">موبایل: </span>
                    <span className="text-sm text-gray-400">{phone}</span>
                </div>
                <div className="text-left col-span-3">
                    <Link href={link} className="text-gray-300 hover:text-indigo-400">مشاهده</Link>
                </div>
            </div>

        </div>
    )
}