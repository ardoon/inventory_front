export default function SectionHeading({title, search}: {
    title: string,
    search?: boolean
}) {

    return (
        <header className="flex mb-10 items-center">
          <h3 className="text-2xl flex-grow">{ title }</h3>
          { search ? <input type="text" className="bg-slate-900 border-0 focus:ring-0 rounded-md h-12" placeholder="جستجوی ..." /> : ''}
        </header>
    )
}