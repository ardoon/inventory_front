import Link from "next/link"

export default function ListItem({ label, link }: {
    label: string,
    link: string
}) {
    return (
        <>
            <li className='relative flex items-center w-full h-16 bg-slate-900 rounded-md px-5'>
                <div className="flex-grow">{ label }</div>
                <Link href={link} className='text-gray-300 hover:text-indigo-400'>مشاهده</Link>          
            </li>
        </>
    )
}