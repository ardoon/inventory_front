import Link from "next/link"
import SectionHeading from "../partials/dashboard/section-heading"
import ProductItem from "./product-item"

export default function Products({ categoryLabel }: {
    categoryLabel: string
}) {

    return (
        <>
            <header className="mb-10">
                <SectionHeading title={`کالاهای دسته ${categoryLabel}`} />
            </header>

            <section className="w-full text-gray-300 space-y-6">

                <Link href='new' className="flex items-center w-full h-16 bg-slate-900 rounded-md justify-center hover:text-indigo-400">
                    <i className="bi bi-plus-lg text-xl p-1 mt-1"></i>
                    افزودن کالا جدید
                </Link>

                <ProductItem name='گرد بر سایز ۳۵' primaryUnit="عدد" secondaryUnit="ندارد" amount={0} link="/" />
                <ProductItem name='گرد بر سایز ۳۵' primaryUnit="عدد" secondaryUnit="ندارد" amount={0} link="/" />
                <ProductItem name='گرد بر سایز ۳۵' primaryUnit="عدد" secondaryUnit="ندارد" amount={0} link="/" />
                <ProductItem name='گرد بر سایز ۳۵' primaryUnit="عدد" secondaryUnit="ندارد" amount={0} link="/" />

            </section>
        </>
    )
}