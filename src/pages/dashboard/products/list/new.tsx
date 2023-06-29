import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TextInputDynamic from "@/components/partials/dashboard/TextInput-dynamic"
import TextInputDynamicNumber from "@/components/partials/dashboard/TextInput-dynamicNumber"
import Product from "@/models/product"
import Head from "next/head"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"
import useSWR from 'swr';
import { GetUnits } from "@/services/unit"
import callApi from "@/helpers/callApi"
import Unit from "@/models/unit"

const NewProduct = () => {

  const router = useRouter();

  const { data: units } = useSWR({ url: '/dashboard/products/units' }, GetUnits);

  const [product, setProduct] = useState<Partial<Product>>({
    name: '',
    categoryId: parseInt(router.query.categoryId as string),
    unitId: undefined,
    secondaryUnitId: undefined,
    unitsRatio: undefined,
    amount: undefined
  })

  function inputHandler(key: string, value: string | number) {
    if (key === "unitId") {
      if (value === "") {
        setProduct({
          ...product,
          unitId: undefined
        })
      }
      const unit: Unit = units.find((unit: Unit) => {
        return unit.name === value;
      })
      if (unit) {
        setProduct({
          ...product,
          unitId: +unit.id
        })
      }
    } else if (key === 'secondaryUnitId') {
      if (value === "") {
        setProduct({
          ...product,
          secondaryUnitId: undefined
        })
      }
      const unit: Unit = units.find((unit: Unit) => {
        return unit.name === value;
      })
      if (unit) {
        setProduct({
          ...product,
          secondaryUnitId: +unit.id
        })
      }
    } else if (key === 'unitsRatio') {
      setProduct({
        ...product,
        unitsRatio: +value
      })
    } else if (key === 'amount') {
      setProduct({
        ...product,
        amount: +value
      })
    } else {
      setProduct({
        ...product,
        [key]: value
      })
    }
  }

  function add(e: FormEvent) {
    e.preventDefault();
    try {
      callApi().post('/products', product)
      router.back();
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | افزودن کالا`}</title>
      </Head>

      <SectionHeading title="افزودن کالای جدید" backward />

      <form className="grid grid-cols-2 gap-4">

        <TextInputDynamic inputHandler={inputHandler} id="name" label="نام کالا" colSpan={1} />
        <TextInputDynamic inputHandler={inputHandler} id="unitId" label="واحد اصلی" colSpan={1} data={units} />
        <TextInputDynamic inputHandler={inputHandler} id="secondaryUnitId" data={units} label="واحد ثانویه" colSpan={1} placeHolder='این فیلد اختیاری است' />
        <TextInputDynamicNumber inputHandler={inputHandler} id="unitsRatio" label="نسبت واحد اولیه به ثانویه (عدد صحیح یا اعشاری)" colSpan={1} placeHolder='در صورت وجود واحد ثانویه اجباری است' />
        <TextInputDynamicNumber inputHandler={inputHandler} id="amount" label="مقدار اولیه" colSpan={1} />

        <button onClick={(e) => add(e)} type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-md h-12 col-span-1 mt-8">ثبت کالا</button>

      </form>

    </DashboardLayout>
  )

}

export default NewProduct;