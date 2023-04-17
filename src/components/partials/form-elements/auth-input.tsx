import React, { useState } from "react";
import { TFunction } from 'next-i18next'
import InputError from "../errors/input-error";

type inputProps = {
    label: string,
    type: string,
    t: TFunction
}

export default function AuthInput(props : inputProps) {

    const inputClass = `h-12 border-0 text-slate-300 text-sm w-full rounded-md block bg-slate-900 focus:ring-0 px-4 ${props.type === 'password' ? 'rtl:pl-14 ltr:pr-14' : ''}`;
    const passwordToggleBtnClass = `text-tiny absolute rtl:left-4 ltr:right-4 cursor-pointer text-slate-400 hover:text-slate-200 ${ true ? 'bottom-10' : 'bottom-4'}`;

    let [showPassword, setShowPassword] = useState<boolean>(false);

    const toggleShowPassword = () => {
        setShowPassword(! showPassword);
    }

    return (

        <div className='w-2/3 block mx-auto space-y-2 relative'>
            <label className='text-slate-300 text-sm' htmlFor='username'>{props.label}</label>
            <input
                id='username'
                type={ showPassword ? 'text' : props.type}
                className={inputClass} />
                <InputError fieldLabel={props.label} t={props.t}/>

                { props.type === 'password' ? <p onClick={toggleShowPassword} className={passwordToggleBtnClass}> {showPassword ? props.t('login.input', { context: 'hidePassword' }) : props.t('login.input', { context: 'showPassword' })} </p> : '' }
                
        </div>

    )
}