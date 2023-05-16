import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TextInputDynamic from "@/components/partials/dashboard/TextInput-dynamic"
import TextInputDynamicNumber from "@/components/partials/dashboard/TextInput-dynamicNumber"
import Product from "@/models/product"
import { deleteProduct, updateProduct } from "@/store/slices/productsSlice"
import { AppDispatch, RootState } from "@/store/store"
import Head from "next/head"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const EditProduct = () => {

  const router = useRouter();

  const units = useSelector((state: RootState) => state.units)

  const current: Product = useSelector((state: RootState) => state.products.find((item) => item.id === router.query.product) as Product)

  const [product, setProduct] = useState<Partial<Product>>(current)

  function inputHandler(key: string, value: string | number) {
    setProduct({
      ...product,
      [key]: value
    })
  }

  const dispatch = useDispatch<AppDispatch>();

  const update = (e: FormEvent) => {
    e.preventDefault();

    dispatch(updateProduct(product));

    router.back();
  }

  const deleteUnitHandler = (id: string | undefined) => {
    if(id) {
      dispatch(deleteProduct(id));
    }

    router.back();
  }

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ویرایش کالا`}</title>
      </Head>

      <SectionHeading title={`ویرایش ${current?.name ?? ''}`} backward />

      <form className="grid grid-cols-2 gap-4">

        <TextInputDynamic inputHandler={inputHandler} value={product?.name} id="name" label="نام کالا" colSpan={1} />
        <TextInputDynamic inputHandler={inputHandler} value={product?.unit} id="unit" label="واحد اصلی" colSpan={1} data={units} />
        <TextInputDynamic inputHandler={inputHandler} value={product?.secondaryUnit} id="secondaryUnit" data={units} label="واحد ثانویه" colSpan={1} placeHolder='این فیلد اختیاری است' />
        <TextInputDynamicNumber inputHandler={inputHandler} value={product?.unitsRatio} id="unitsRatio" label="نسبت واحد اولیه به ثانویه (عدد صحیح یا اعشاری)" colSpan={1} placeHolder='در صورت وجود واحد ثانویه اجباری است' />

        <button onClick={(e) => update(e)} type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-md h-12 col-span-1 mt-4">ذخیره تغییرات</button>
        <span onClick={() => deleteUnitHandler(product.id)} className="bg-rose-600 flex justify-center items-center hover:bg-rose-700 cursor-pointer rounded-md h-12 col-span-1 self-end">حذف</span>

      </form>

    </DashboardLayout>
  )

}

export default EditProduct;