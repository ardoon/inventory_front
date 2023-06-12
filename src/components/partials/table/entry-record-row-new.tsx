import { useState } from "react";
import TextInputWithData from "../dashboard/TextInput-with-data";
import TextInputDynamicNumber from "../dashboard/TextInput-dynamicNumber";
import TextInputDynamic from "../dashboard/TextInput-dynamic";
import { toast } from "react-toastify";
import Record from "@/models/record";

export default function EntryRecordRowNew({add}: {add: Function}) {

    const initial = {
        productId: '',
        productName: '',
        amount: '',
        unitId: '',
        unitName: '',
        price: '',
        description: ''
    }

    const [record, setRecord] = useState<Partial<Record>>(initial);

    function inputHandler(key: string, value: string | number, content?: string) {
        if(content) {
            if(key === 'productId') {
                setRecord({
                    ...record,
                    productId: +value,
                    productName: content
                })
            } else if(key === 'unitId') {
                setRecord({
                    ...record,
                    unitId: +value,
                    unitName: content
                })
            }
        } else {
            if(key === "description") {
                setRecord({
                    ...record,
                    [key]: value as string
                })
            } else {
                setRecord({
                    ...record,
                    [key]: +value
                })
            }
        }
    }

    function addRecord() {
        if(record.productId && record.amount && record.unitId && (record.price || record.price == 0)) {
            add(record);
            setRecord(initial)
        } else {
            toast.warning('لطفا همه فیلد های ضروری پر شود');
        }
    }

    return (
        <tr className="space-x-2">
            <td className="flex items-center h-10 justify-center">

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
                <TextInputDynamicNumber value={record.price as number} colSpan={1} id="price" label="" inputHandler={inputHandler} />
            </td>
            <td>
                <TextInputDynamic value={record.description} colSpan={1} id="description" label="" inputHandler={inputHandler} />
            </td>
            <td className="pt-1 text-2xl cursor-pointer flex items-center" onClick={addRecord}>
                +
            </td>
        </tr>
    )
}