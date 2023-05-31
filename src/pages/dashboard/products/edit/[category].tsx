import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TextInput from "@/components/partials/dashboard/TextInput"
import callApi from "@/helpers/callApi"
import Category from "@/models/category"
import Section from "@/models/section"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const EditCategory = () => {

  const router = useRouter();
  
  const [category, setCategory] = useState<Partial<Category> | undefined>();
  const [state, setState] = useState<string | undefined>()
  
  useEffect(() => {
    callApi().get(`/categories/${router.query.category}`).then((res) => {
      setCategory(res.data);
      setState(res.data.name);
    });
  },[router.query.category]);

  const update = async (e: any) => {
    e.preventDefault();
    try {
      await callApi().patch(`/categories/${router.query.category}`, {...category, name: state})
      router.back()
    } catch (err) {
      console.log(err);
    }
  }

  function inputHandler(name: string) {
    setState(name);
  }

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ویرایش ${category?.name}`}</title>
      </Head>

      <section className="mb-10">
        <SectionHeading title={`ویرایش ${category?.name}`} backward />
        <form className="grid grid-cols-6 gap-4">
          <TextInput id='categoryName' label='نام دسته' defaultValue={category?.name} value={state} inputHandler={inputHandler} colSpan={4} />
          <button onClick={(e) => update(e)} type="submit" className="bg-indigo-600 h-12 self-end rounded-md">ذخیره</button>
        </form>

      </section>

    </DashboardLayout>
  )

}

export default EditCategory;