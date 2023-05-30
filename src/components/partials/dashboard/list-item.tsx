import Link from "next/link"
import { KeyedMutator } from "swr"

export default function ListItem({ label, link, slug, id }: {
    label: string,
    link: string,
    slug: string,
    id: string,
}) {
    return (
        <>
            <li className='relative flex items-center w-full h-16 bg-slate-900 rounded-md px-5'>
                <div className="flex-grow">{ label }</div>
                <Link href={link+slug} as={link+id} className='text-gray-300 hover:text-indigo-400'>مشاهده</Link>          
            </li>
        </>
    )
}