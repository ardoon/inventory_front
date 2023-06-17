import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { ReactNode } from 'react'

export default function AuthLayout({ children }: {
    children: ReactNode
}) {

    // const router = useRouter();

    // const {user, error, loading} = useAuth();

    // if(user) {
    //     router.push('/dashboard');
    //     return <></>;
    // }

    return (

        <main className='container mx-auto justify-center text-white'>
        { children }
        </main>

    )
}