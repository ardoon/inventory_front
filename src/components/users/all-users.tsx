import ProductItem from "@/components/products/product-item";
import Link from "next/link";
import ListItem from "../partials/dashboard/list-item"
import ListItemInput from "../partials/dashboard/list-item-input";
import SectionHeading from "../partials/dashboard/section-heading";
import UserItem from "./user-item";

export default function AllUsers({ title }: {
    title?: string
}) {

    return (
        <section className="w-full text-gray-300 space-y-6">

            <Link href='/dashboard/users/new' className="flex items-center w-full h-16 bg-slate-900 rounded-md justify-center hover:text-indigo-400">
                <i className="bi bi-plus-lg text-xl p-1 mt-1"></i>
                افزودن کاربر جدید
            </Link>

            <UserItem name='چیا کیانی' access="مدیر" role="انباردار" phone="09181730076" link="/" />
            <UserItem name='چیا کیانی' access="مدیر" role="انباردار" phone="09181730076" link="/" />
            <UserItem name='چیا کیانی' access="مدیر" role="انباردار" phone="09181730076" link="/" />
            <UserItem name='چیا کیانی' access="مدیر" role="انباردار" phone="09181730076" link="/" />

        </section>
    )
}