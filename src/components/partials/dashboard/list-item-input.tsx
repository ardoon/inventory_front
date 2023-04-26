import Link from "next/link"

export default function ListItemInput({ placeHolder, id }: {
    placeHolder: string,
    id: string
}) {
    return (
        <>
            <li>
                <form className='relative flex items-center w-full h-16 bg-slate-900 rounded-md px-3'>
                    <input
                        id={id}
                        type='text'
                        placeholder={placeHolder}
                        className="flex-grow bg-transparent border-0 focus:ring-0"
                    />
                    <button type="submit" className="rtl:ml-2 ltr:mr-2 hover:text-indigo-400">افزودن</button>
                </form>
            </li>
        </>
    )
}