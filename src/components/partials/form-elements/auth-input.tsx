import { useState } from "react";
import { useTranslation } from 'next-i18next'

type inputProps = {
    label: string,
    type: string
}

export default function AuthInput(props : inputProps) {

    const { t } = useTranslation('auth')

    const inputClass = `h-12 border-0 text-slate-300 text-sm w-full rounded-md block bg-slate-900 focus:ring-0 px-4 ${props.type === 'password' ? 'rtl:pl-14 ltr:pr-14' : ''}`;
    const passwordToggleBtnClass = 'text-tiny absolute bottom-4 rtl:left-4 ltr:right-4 cursor-pointer text-slate-400 hover:text-slate-200';

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

                { props.type === 'password' ? <p onClick={toggleShowPassword} className={passwordToggleBtnClass}> {showPassword ? t('login.input', { context: 'hidePassword' }) : t('login.input', { context: 'showPassword' })} </p> : '' }
                
        </div>

    )
}