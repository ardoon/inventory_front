import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TextInput from "@/components/partials/dashboard/TextInput"
import callApi from "@/helpers/callApi"
import Section from "@/models/section"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const EditSection = () => {

  const router = useRouter();
  
  const [section, setSection] = useState<Partial<Section> | undefined>();
  const [state, setState] = useState<string | undefined>()
  
  useEffect(() => {
    callApi().get(`/sections/${router.query.section}`).then((res) => {
      setSection(res.data);
      setState(res.data.name);
    });
  },[router.query.section]);

  const update = async (e: any) => {
    e.preventDefault();
    try {
      await callApi().patch(`/sections/${router.query.section}`, {...section, name: state})
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
        <title>{`SamCity | ویرایش ${section?.name}`}</title>
      </Head>

      <section className="mb-10">
        <SectionHeading title={`ویرایش ${section?.name}`} backward />
        <form className="grid grid-cols-6 gap-4">
          <TextInput id='categoryName' label='نام بخش' defaultValue={section?.name} value={state} inputHandler={inputHandler} colSpan={4} />
          <button onClick={(e) => update(e)} type="submit" className="bg-indigo-600 h-12 self-end rounded-md">ذخیره</button>
        </form>

      </section>

    </DashboardLayout>
  )

}

export default EditSection;