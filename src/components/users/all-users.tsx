import Link from "next/link";
import UserItem from "./user-item";
import useSWR from 'swr';
import { GetUsers } from "@/services/user";
import User from "@/models/user";

export default function AllUsers({ title }: {
    title?: string
}) {

    const access = [
        {name: 'مدیر', key: 'admin'},
        {name: 'انباردار', key: 'manager'},
        {name: 'عادی', key: 'normal'},
      ]

      const {data: users, error, mutate} = useSWR({url: '/dashboard/sections'}, GetUsers)
      const loadingItems = !users && !error;  

    function getType(key: string) {

        let value: string = 'نا معلوم';
        
        access.forEach(item => {
            if(item.key === key) {
                value = item.name
            }
        })

        return value

    }

    return (
        <section className="w-full text-gray-300 space-y-6">

            <Link href='/dashboard/users/new' className="flex items-center w-full h-16 bg-slate-900 rounded-md justify-center hover:text-indigo-400">
                <i className="bi bi-plus-lg text-xl p-1 mt-1"></i>
                افزودن کاربر جدید
            </Link>

            {
                loadingItems ?
                <p>Loading..</p>
                : users.map((user: User) => {
                    return <UserItem key={user.id} name={user.name} access={getType(user.type)} role={user.role} phone={user.mobile ?? 'ندارد'} link={`/dashboard/users/edit/${user.id}`} />
                })
            }
            

        </section>
    )
}