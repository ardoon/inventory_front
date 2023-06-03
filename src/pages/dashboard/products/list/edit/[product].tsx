import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TextInputDynamic from "@/components/partials/dashboard/TextInput-dynamic"
import TextInputDynamicNoValue from "@/components/partials/dashboard/TextInput-dynamicNoValue"
import TextInputDynamicNumber from "@/components/partials/dashboard/TextInput-dynamicNumber"
import callApi from "@/helpers/callApi"
import Product from "@/models/product"
import Unit from "@/models/unit"
import { GetUnits } from "@/services/unit"
import { deleteProduct, updateProduct } from "@/store/slices/productsSlice"
import { AppDispatch, RootState } from "@/store/store"
import Head from "next/head"
import { useRouter } from "next/router"
import { FormEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useSWR from 'swr'

const EditProduct = () => {

  const router = useRouter();

  const { data: units, error: err } = useSWR({ url: '/dashboard/products/units' }, GetUnits);
  const loadingUnits = !units && !err;

  const [product, setProduct] = useState<Partial<Product> | undefined>();
    useEffect(() => {
        callApi().get(`/products/${router.query.product}`).then((res) => {
            setProduct(res.data);
        });
    }, [router.query.product]);

    function inputHandler(key: string, value: string | number) {
      if(key === "unitId") {
        if(value === "") {
          setProduct({
            ...product,
            unitId: undefined
          })
        }
        const unit: Unit = units.find((unit: Unit) => {
          return unit.name === value;
        })
        if(unit) { 
          setProduct({
            ...product,
            unitId: +unit.id
          })
        }
      } else if(key === 'secondaryUnitId') {
        if(value === "") {
          setProduct({
            ...product,
            secondaryUnitId: undefined
          })
        }
        const unit: Unit = units.find((unit: Unit) => {
          return unit.name === value;
        })
        if(unit) { 
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
      } else {
        setProduct({
          ...product,
          [key]: value
        })
      }
    }


  const update = (e: FormEvent) => {
    e.preventDefault();

    try {
      callApi().patch(`/products/${router.query.product}`, product)
    } catch(e) {
      console.log(e);
    }

    router.push(`/dashboard/products/list/${product?.categoryId}`);
  }

  const deleteUnitHandler = (id: string | undefined) => {
    try {
      callApi().delete(`/products/${router.query.product}`)
    } catch(e) {
      console.log(e);
    }

    router.push(`/dashboard/products/list/${product?.categoryId}`);
  }

  function getUnit(id: number | undefined) {
    const unit: Unit = units.find((unit: Unit) => {
        return +unit.id === id;
    })
    console.log(unit, id);
    
    if(unit) {
        return unit.name;
    }
    return undefined;
}

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ویرایش کالا`}</title>
      </Head>

      <SectionHeading title={`ویرایش ${product?.name ?? ''}`} backward />

      {
        loadingUnits ? <p>Loading..</p>
          : <form className="grid grid-cols-2 gap-4">

            <TextInputDynamic inputHandler={inputHandler} value={product?.name} id="name" label="نام کالا" colSpan={1} />
            <TextInputDynamicNoValue inputHandler={inputHandler} defaultValue={getUnit(product?.unitId)} id="unitId" label="واحد اصلی" colSpan={1} data={units} />
            <TextInputDynamicNoValue inputHandler={inputHandler} defaultValue={getUnit(product?.secondaryUnitId)} id="secondaryUnitId" data={units} label="واحد ثانویه" colSpan={1} placeHolder='این فیلد اختیاری است' />
            <TextInputDynamicNumber inputHandler={inputHandler} value={product?.unitsRatio} id="unitsRatio" label="نسبت واحد اولیه به ثانویه (عدد صحیح یا اعشاری)" colSpan={1} placeHolder='در صورت وجود واحد ثانویه اجباری است' />

            <button onClick={(e) => update(e)} type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-md h-12 col-span-1 mt-4">ذخیره تغییرات</button>
            <span onClick={() => deleteUnitHandler(product?.id)} className="bg-rose-600 flex justify-center items-center hover:bg-rose-700 cursor-pointer rounded-md h-12 col-span-1 self-end">حذف</span>

          </form>
      }


    </DashboardLayout>
  )

}

export default EditProduct;