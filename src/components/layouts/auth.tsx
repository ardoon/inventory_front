import { ReactNode } from 'react'

export default function AuthLayout({ children }: {
    children: ReactNode
}) {
    return (

        <main>

            <h1 className='p-10 bg-slate-400'>Header Code</h1>

            <section style={{ width: "1024px" }}>{children}</section>

            <h1 className='p-10 bg-slate-400'>Footer</h1>

        </main>
        
    )
}