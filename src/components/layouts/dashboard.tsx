import { TFunction, useTranslation } from 'next-i18next';
import { ReactNode } from 'react'
import Sidebar from '../partials/sidebar/sidebar'

export default function DashboardLayout({ children }: {
    children: ReactNode,
}) {

    const { t } = useTranslation('sidebar')

    return (
        <main className='grid grid-cols-5 text-slate-300'>
            <Sidebar t={t} />
            <section className='col-span-4'>
                {children}
            </section>
        </main>

    )
}