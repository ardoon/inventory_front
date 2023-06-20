import { useEffect, useState } from "react";
import TextInputWithData from "../dashboard/TextInput-with-data";
import TextInputDynamic from "../dashboard/TextInput-dynamic";
import Record from "@/models/record";
import TextInputDynamicNumber from "../dashboard/TextInput-dynamicNumber";
import OutgoRecord from "@/models/outgoRecord";

export default function OutgoRecordRow({update, remove, no, single}: {update: Function, remove: Function, no: number, single: OutgoRecord}) {

    const initial = {
        productId: undefined,
        amount: undefined,
        unitId: undefined,
        description: undefined
    }

    const [record, setRecord] = useState<Partial<OutgoRecord>>(single);

    useEffect(() => {
        setRecord(single)
    }, [single])

    function inputHandler(key: string, value: string | number, content?: string) {
        if(content) {
            if(key === 'productId') {
                setRecord({
                    ...record,
                    productId: value as number,
                    productName: content
                })
                update(no, {...record,[key]: value, productName: content});
            } else if(key === 'unitId') {
                setRecord({
                    ...record,
                    unitId: value as number,
                    unitName: content
                })
                update(no, {...record,[key]: value, unitName: content});
            }
        } else {
            setRecord({
                ...record,
                [key]: value
            })
            update(no, {...record,[key]: value});
        }
    }

    return (
        <tr className="space-x-2">
            <td className="flex items-center h-12 pt-5 justify-center">
                {no + 1}
            </td>
            <td>
                <TextInputWithData colSpan={1} id="productId" value={record.productName} label="" dataKey="products" inputHandler={inputHandler} />
            </td>
            <td>
                <TextInputDynamicNumber value={record.amount as number} colSpan={1} id="amount" label="" inputHandler={inputHandler} />
            </td>
            <td>
                {
                    record.productId ? <TextInputWithData value={record.unitName} colSpan={1} id="unitId" label="" dataKey={`products/units/${record.productId}`} inputHandler={inputHandler} />
                    : <TextInputDynamic colSpan={1} id="unitId" label="" inputHandler={inputHandler} isDisable />
                }
                
            </td>
            <td>
                <TextInputDynamic value={record.description} colSpan={1} id="description" label="" inputHandler={inputHandler} />
            </td>
            <td className="pt-1" onClick={() => remove(no)}><i className="bi bi-trash3 cursor-pointer text-rose-400"></i></td>
        </tr>
    )
}