import Category from "@/models/category"
import Link from "next/link"
import { useRouter } from "next/router"
import SectionHeading from "../partials/dashboard/section-heading"
import { useEffect, useState } from "react"
import callApi from "@/helpers/callApi"
import { GetUnits } from "@/services/unit"
import useSWR from 'swr';
import Product from "@/models/product"
import ProductItem from "./product-item"
import Unit from "@/models/unit"

export default function Products() {

    const router = useRouter();

    const {data: products, error, mutate} = useSWR({url: `/dashboard/products/list/${router.query.category}`}, async () => {
        const res = (await callApi().get(`/products?categoryId=${router.query.category}`)).data;
        return res as Product[];
    })
    const loadingItems = !products && !error;

    const {data: units, error: err} = useSWR({url: '/dashboard/products/units'}, GetUnits);
    const loadingUnits = !units && !err;

    mutate();

    const [category, setCategory] = useState<Category | undefined>();
    useEffect(() => {
        callApi().get(`/categories/${router.query.category}`).then((res) => {
            setCategory(res.data);
        });
    }, [router.query.category]);

    function getUnit(id: number | undefined): string {
        const unit: Unit = units.find((unit: Unit) => {
            return +unit.id === id;
        })
        if(unit) {
            return unit.name;
        }
        return 'ندارد';
    }

    return (
        <>
            <header className="mb-10">
                <SectionHeading title={`کالاهای دسته ${category?.name}`} backward />
            </header>

            <section className="w-full text-gray-300 space-y-6">

                <>
                    <Link href={`new?categoryId=${category?.id}`} className="flex items-center w-full h-16 bg-slate-900 rounded-md justify-center hover:text-indigo-400">
                        <i className="bi bi-plus-lg text-xl p-1 mt-1"></i>
                        افزودن کالا جدید
                    </Link>

                    {
                        loadingItems || loadingUnits ? <p>Loading..</p>
                        : products?.map((item: Product) => {
                            return <ProductItem key={item.id} name={item.name} primaryUnit={getUnit(item.unitId)} secondaryUnit={getUnit(item.secondaryUnitId)} amount={item.amount ?? 0} link={`/dashboard/products/list/edit/${item.id}`} />
                        })
                    }
                </>

            </section>
        </>
    )
}