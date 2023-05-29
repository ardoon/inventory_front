import { useTranslation } from 'next-i18next';
import { ReactNode, useEffect } from 'react'
import Sidebar from '../partials/sidebar/sidebar'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function DashboardLayout({ children }: {
    children: ReactNode,
}) {

    const { t } = useTranslation('sidebar')

    const router = useRouter();

    useEffect(() => {
        const user = useSelector((state: RootState) => state.auth.user);

        if(!user) {
            router.push('/')
        }
    })

    return (
        <main className='grid grid-cols-5 text-slate-300'>
            <Sidebar t={t} />
            <section className='col-span-4 p-12'>
                {children}
            </section>
        </main>

    )
}