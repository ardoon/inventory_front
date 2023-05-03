import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function ListItemInput({ placeHolder, id, add }: {
    placeHolder: string,
    id: string,
    add: Function
}) {

    const [name, setName] = useState<string>("");

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const addHandler = (e: React.FormEvent) => {
        
        e.preventDefault();

        let newOne = {
            id: uuidv4(),
            name: name
        }

        // API call

        add(newOne)

        setName("");

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
                        value={name}
                    />
                    <button onClick={(e) => addHandler(e)} type="submit" className="rtl:ml-2 ltr:mr-2 hover:text-indigo-400">افزودن</button>
                </form>
            </li>
        </>
    )
}