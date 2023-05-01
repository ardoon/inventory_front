import { addUnit } from "@/store/slices/unitsSlice";
import { AppDispatch } from "@/store/store";
import Link from "next/link"
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function ListItemInput({ placeHolder, id }: {
    placeHolder: string,
    id: string,
}) {

    const dispatch = useDispatch<AppDispatch>();

    const [unitName, setUnitName] = useState<string>("");

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUnitName(e.target.value)
    }

    const addUnitHandler = (e: React.FormEvent) => {
        
        e.preventDefault();

        let unit = {
            name: unitName
        }

        // API call

        dispatch(addUnit(unit))

        setUnitName("");

    }


    return (
        <>
            <li>
                <form className='relative flex items-center w-full h-16 bg-slate-900 rounded-md px-3'>
                    <input
                        id={id}
                        type='text'
                        placeholder={placeHolder}
                        className="flex-grow bg-transparent border-0 focus:ring-0"
                        onChange={(e) => inputHandler(e)}
                        value={unitName}
                    />
                    <button onClick={(e) => addUnitHandler(e)} type="submit" className="rtl:ml-2 ltr:mr-2 hover:text-indigo-400">افزودن</button>
                </form>
            </li>
        </>
    )
}