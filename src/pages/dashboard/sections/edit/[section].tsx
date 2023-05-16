import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TextInput from "@/components/partials/dashboard/TextInput"
import { updateSection } from "@/store/slices/sectionsSlice"
import { AppDispatch, RootState } from "@/store/store"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const EditSection = () => {

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const sections = useSelector((state: RootState) =>
    state.sections
  )

  const section = sections.find((item) => {
    return item.id === router.query.section
  })

  const update = (e: any, name: string) => {
    e.preventDefault();
    dispatch(updateSection({
      id: section?.id,
      name: state
    }));
    router.back();
  }

  function inputHandler(name: string) {
    setState(name);
  }

  const [state, setState] = useState<string>(section?.name || "")

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ویرایش ${section?.name}`}</title>
      </Head>

      <section className="mb-10">
        <SectionHeading title={`ویرایش ${section?.name}`} backward />
        <form className="grid grid-cols-6 gap-4">
          <TextInput id='categoryName' label='نام بخش' value={state} inputHandler={inputHandler} colSpan={4} />
          <button onClick={(e) => update(e,state)} type="submit" className="bg-indigo-600 h-12 self-end rounded-md">ذخیره</button>
        </form>

      </section>

    </DashboardLayout>
  )

}

export default EditSection;