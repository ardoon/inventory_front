import { useState } from "react";
import TextInputWithData from "../dashboard/TextInput-with-data";
import TextInputDynamicNumber from "../dashboard/TextInput-dynamicNumber";
import TextInputDynamic from "../dashboard/TextInput-dynamic";
import { toast } from "react-toastify";
import Record from "@/models/record";

export default function EntryRecordRowNew({add}: {add: Function}) {

    const initial = {
        productId: undefined,
        amount: undefined,
        unitId: undefined,
        price: undefined,
        description: undefined
    }

    interface Form {
        productId: string | undefined,
        amount: string | undefined,
        unitId: string | undefined,
        price: string | undefined,
        description: string | undefined
    }

    const [record, setRecord] = useState<Partial<Record>>(initial);
    const [form, setForm] = useState<Form>(initial);

    function inputHandler(key: string, value: string | number, content?: string) {
        setRecord({
            ...record,
            [key]: value
        })
        setForm({
            ...form,
            [key]: content ?? value
        })
    }

    function addRecord() {
        if(record.productId && record.amount && record.unitId && (record.price || record.price == 0)) {
            add(record);
            setRecord(initial)
            setForm({
                productId: "",
                amount: "",
                unitId: "",
                price: "",
                description: ""
            })
        } else {
            toast.warning('لطفا همه فیلد های ضروری پر شود');
        }
    }

    return (
        <tr className="space-x-2">
            <td className="flex items-center h-10 justify-center">

            </td>
            <td>
                <TextInputWithData colSpan={1} id="productId" value={form.productId} label="" dataKey="products" inputHandler={inputHandler} />
            </td>
            <td>
                <TextInputDynamic value={form.amount} colSpan={1} id="amount" label="" inputHandler={inputHandler} />
            </td>
            <td>
                {
                    record.productId ? <TextInputWithData value={form.unitId} colSpan={1} id="unitId" label="" dataKey={`products/units/${record.productId}`} inputHandler={inputHandler} />
                    : <TextInputDynamic colSpan={1} id="unitId" label="" inputHandler={inputHandler} isDisable />
                }
                
            </td>
            <td>
                <TextInputDynamic value={form.price} colSpan={1} id="price" label="" inputHandler={inputHandler} />
            </td>
            <td>
                <TextInputDynamic value={form.description} colSpan={1} id="description" label="" inputHandler={inputHandler} />
            </td>
            <td className="pt-1 text-2xl cursor-pointer flex items-center" onClick={addRecord}>
                +
            </td>
        </tr>
    )
}