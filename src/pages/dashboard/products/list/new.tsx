import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TextInputDynamic from "@/components/partials/dashboard/TextInput-dynamic"
import TextInputDynamicNumber from "@/components/partials/dashboard/TextInput-dynamicNumber"
import Product from "@/models/product"
import { addProduct } from "@/store/slices/productsSlice"
import { AppDispatch, RootState } from "@/store/store"
import Head from "next/head"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from 'uuid';

const NewProduct = () => {

  const router = useRouter();

  const units = useSelector((state: RootState) => state.units)

  const [product, setProduct] = useState<Product>({
    id: uuidv4(),
    name: '',
    categoryId: router.query.categoryId as string,
    unit: '',
    secondaryUnit: undefined,
    unitsRatio: undefined
  })

  function inputHandler(key: string, value: string | number) {
    setProduct({
      ...product,
      [key]: value
    })
  }

  const dispatch = useDispatch<AppDispatch>();


  const add = (e: FormEvent) => {
    e.preventDefault();

    dispatch(addProduct(product)); 

    router.back();
  }


  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | افزودن کالا`}</title>
      </Head>

      <SectionHeading title="افزودن کالای جدید" backward />

      <form className="grid grid-cols-2 gap-4">

        <TextInputDynamic inputHandler={inputHandler} id="name" label="نام کالا" colSpan={1} />
        <TextInputDynamic inputHandler={inputHandler} id="unit" label="واحد اصلی" colSpan={1} data={units} />
        <TextInputDynamic inputHandler={inputHandler} id="secondaryUnit" data={units} label="واحد ثانویه" colSpan={1} placeHolder='این فیلد اختیاری است' />
        <TextInputDynamicNumber inputHandler={inputHandler} id="unitsRatio" label="نسبت واحد اولیه به ثانویه (عدد صحیح یا اعشاری)" colSpan={1} placeHolder='در صورت وجود واحد ثانویه اجباری است' />

        <button onClick={(e) => add(e)} type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-md h-12 col-span-2 mt-4">ثبت کالا</button>

      </form>

    </DashboardLayout>
  )

}

export default NewProduct;