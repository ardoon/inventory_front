import Link from "next/link"
import { KeyedMutator } from "swr"

export default function ListItem({ label, link, slug, id, disableAsLink }: {
    label: string,
    link: string,
    slug: string,
    id: string,
    disableAsLink?: boolean;
}) {
    return (
        <>
            <li className='relative flex items-center w-full h-16 bg-slate-900 rounded-md px-5'>
                <div className="flex-grow">{ label }</div>
                {
                    disableAsLink ? <Link href={link+id} className='text-gray-300 hover:text-indigo-400'>مشاهده</Link>
                    : <Link href={link+slug} as={link+id} className='text-gray-300 hover:text-indigo-400'>مشاهده</Link> 
                }
                         
            </li>
        </>
    )
}