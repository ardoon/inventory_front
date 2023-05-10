import Category from "@/models/category"
import Unit from "@/models/unit"
import { RootState } from "@/store/store"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import SectionHeading from "../partials/dashboard/section-heading"
import ProductItem from "./product-item"

export default function Products({ categoryLabel }: {
    categoryLabel: string
}) {

    const { t } = useTranslation()

    const router = useRouter();

    const categories: Category[] = useSelector((state: RootState) =>
        state.categories
    )

    const category = categories.find((cate) => cate.id === router.query.category)

    const products = useSelector((state: RootState) => state.products.filter((item) => {
        return item.categoryId === category?.id
    }))    

    const units: Unit[] = useSelector((state: RootState) =>
        state.units
    )

    return (
        <>
            <header className="mb-10">
                <SectionHeading title={`کالاهای دسته ${category?.name}`} backward/>
            </header>

            <section className="w-full text-gray-300 space-y-6">

                <>
                    <Link href={`new?categoryId=${category?.id}`} className="flex items-center w-full h-16 bg-slate-900 rounded-md justify-center hover:text-indigo-400">
                        <i className="bi bi-plus-lg text-xl p-1 mt-1"></i>
                        افزودن کالا جدید
                    </Link>

                    {
                        products.map((item) => {
                            let unit1: string = (units.find((unit) => { return unit.id === item.unitId }))?.name as string;
                            let unit2: string = 'ندارد';
                            if (item.secondaryUnitId) {
                                unit2 = (units.find((unit) => { return unit.id === item.unitId }))?.name as string;
                            }
                            return <ProductItem name={item.name} primaryUnit={unit1} secondaryUnit={unit2} amount={0} link={`/dashboard/products/list/${item.id}`} />
                        })
                    }
                </>

            </section>
        </>
    )
}