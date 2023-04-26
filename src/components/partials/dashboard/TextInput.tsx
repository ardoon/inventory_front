export default function TextInput({ id, label, colSpan, placeHolder, isDisable, data, value }: {
    id: string,
    label: string,
    colSpan: number,
    placeHolder?: string,
    isDisable?: boolean,
    data?: Array<string>,
    value?: string
}) {

    let listId;
    
    if (data) 
        listId = 'list'

    return (
        <div className={`col-span-${colSpan} space-y-2 relative`}>
            <label className='text-slate-300 text-sm' htmlFor={id}>{label}</label>
            <input
                id={id}
                type='text'
                list={listId}
                value={value}
                placeholder={placeHolder}
                disabled={isDisable}
                className={`h-12 border-0 text-slate-300 text-sm w-full rounded-md block bg-slate-800 focus:ring-0 px-4`} />

            {
                data ?
                    (
                        <datalist id='list' className="bg-yellow">

                            {data?.map((unit, index) => {
                                return <option key={index} value={unit} className="bg-yellow">{unit}</option>
                            })}

                        </datalist>
                    )
                    : ''
            }
        </div>
    )
}