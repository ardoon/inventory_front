export default function TextInputDynamicNoValue({ id, label, colSpan, placeHolder, isDisable, data, defaultValue, inputHandler }: {
    id: string,
    label: string,
    colSpan: number,
    placeHolder?: string,
    isDisable?: boolean,
    data?: Array<any>,
    defaultValue?: string,
    inputHandler?: Function
}) {
    
    let listId;

    if (data)
    listId = 'list'
    
    const handler = (e: any) => {
        let value = e.target.value

        if (inputHandler) {
            inputHandler(id, value)
        }

    }

    return (
        <div className={`col-span-${colSpan} space-y-2 relative`}>
            <label className='text-slate-300 text-sm' htmlFor={id}>{label}</label>
            <input
                onChange={(e) => handler(e)}
                onClick={(e) => handler(e)}
                id={id}
                type='text'
                list={listId}
                defaultValue={defaultValue}
                placeholder={placeHolder}
                disabled={isDisable}
                autoComplete="off"
                className={`h-12 border-0 text-slate-300 text-sm w-full rounded-md block bg-slate-800 focus:ring-0 px-4`} />            {
                data ?
                    (
                        <datalist id='list' className="bg-yellow">

                            {data?.map((item, index) => {
                                return <option key={index} value={item.name} className="bg-yellow">{item.name}</option>
                            })}

                        </datalist>
                    )
                    : ''
            }
        </div>
    )
}