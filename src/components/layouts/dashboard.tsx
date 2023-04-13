import { ReactNode } from 'react'

export default function DashboardLayout({ children }: {
    children: ReactNode
}) {
    return (

        <main>

            <section style={{ width: "1024px" }}>{children}</section>

            <h1 className='p-10 bg-orange-400 text-center'>Footer</h1>

        </main>
        
    )
}