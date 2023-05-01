import { useRouter } from "next/router"

export default function SectionHeading({title, search, backward}: {
    title: string,
    search?: boolean,
    backward?: boolean | string
}) {

    const router = useRouter()    

    return (
        <header className="flex mb-10 items-center">
          <h3 className="text-2xl flex-grow">{ title }</h3>
          { search ? <input type="text" className="bg-slate-900 border-0 focus:ring-0 rounded-md h-12" placeholder="جستجوی ..." /> : ''}
          { backward ? <i onClick={() => {(typeof(backward) === "boolean") ? router.back(): router.push(backward)}} className={`bi ${ router.locale === 'en' ? 'bi-arrow-right': 'bi-arrow-left'} text-3xl cursor-pointer hover:text-indigo-400`}></i>: ''}
        </header>
    )
}