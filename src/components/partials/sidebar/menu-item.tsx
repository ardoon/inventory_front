import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type inputProps = {
    children?: React.ReactNode,
    label: string,
    icon: string,
    link?: string,
    action?: () => void
}

export default function MenuItem(props: inputProps) {

    const [active, setActive] = useState<Boolean>(false);

    const router = useRouter();

    return (
        <>
            <li onClick={props.action}>
                <div className='flex items-center'>
                    <i className={`bi bi-${props.icon} rtl:ml-2 ltr:mr-2 text-xl text-indigo-400`}></i>
                    {
                        props.link ? <Link href={props.link} className='hover:text-indigo-400 block' >
                            {props.label}
                        </Link> : <span className='hover:text-indigo-400 block cursor-pointer' >
                            {props.label}
                        </span>
                    }

                    {
                        props.children ?
                            active === true ? <i onClick={() => { setActive(!active) }} className="bi bi-caret-down rtl:mr-1 ltr:ml-1 cursor-pointer"></i> : <i onClick={() => { setActive(!active) }} className={`bi rtl:mr-1 ltr:ml-1 self-center cursor-pointer ${router.locale === 'en' ? 'bi-caret-right' : 'bi-caret-left'}`}></i>
                            : ''
                    }

                </div>
                {
                    active === true ?
                        <ul className='rtl:pr-4 ltr:pl-4 mt-4 mb-8 space-y-3 text-sm'>
                            {props.children}
                        </ul>
                        : ''
                }

            </li>
        </>
    )
}