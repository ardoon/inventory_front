import callApi from '@/helpers/callApi';
import useSWR from 'swr';

export default function TextInputWithData({ id, label, colSpan, placeHolder, isDisable, dataKey, value, defaultValue, inputHandler }: {
    id: string,
    label: string,
    colSpan: number,
    placeHolder?: string,
    isDisable?: boolean,
    dataKey: string,
    value?: string,
    defaultValue?: string,
    inputHandler: Function
}) {

    interface Data {
        id: number,
        name: string
    }

    const { data } = useSWR(dataKey, async () => {
        return (await callApi().get(`/${dataKey}`)).data
    });

    const handler = (e: any) => {
        let value = e.target.value

        if (value === "") {
            inputHandler(id, undefined);
        }
        const item = data.find((item: any) => {
            return item.name === value;
        })
        if (item) {
            inputHandler(id, item.id, item.name)
        } else {
            inputHandler(id, undefined);
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
                list={dataKey}
                defaultValue={defaultValue}
                value={value}
                placeholder={placeHolder}
                disabled={isDisable}
                autoComplete="off"
                className={`h-12 border-0 text-slate-300 text-sm w-full rounded-md block bg-slate-800 focus:ring-0 px-4`} />

            <datalist id={dataKey} className="bg-yellow">

                {data?.map((item: any, index: number) => {
                    return <option key={index} value={item.name} className="bg-yellow">{item.name}</option>
                })}

            </datalist>

        </div>
    )
}