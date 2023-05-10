import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import TextInput from "@/components/partials/dashboard/TextInput"
import Category from "@/models/category"
import { editCategory } from "@/store/slices/categoriesSlice"
import { AppDispatch, RootState } from "@/store/store"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

const EditSubCategories = () => {

  const { t } = useTranslation(['dashboard'])

  const router = useRouter();

  const categories: Category[] = useSelector((state: RootState) =>
    state.categories
  )

  const category = categories.find((cate) => cate.id === router.query.category)

  const dispatch = useDispatch<AppDispatch>();

  let prevCategoryName: string = ''

  if(category) {
    prevCategoryName = category.name
  }

  const [categoryName, setCategoryName] = useState<string>(prevCategoryName);

  const inputHandler = (name: string) => {
    setCategoryName(name)
  }

  const updateCategoryHandler = (e: React.FormEvent) => {

    e.preventDefault();

    let cate = {
      id: router.query.category as string,
      name: categoryName
    }

    // API call

    dispatch(editCategory(cate))

    router.back()

  }

  return (
    <DashboardLayout>
      {
        category ?
          <>
            <Head>
              <title>{`SamCity | ${category.name}`}</title>
            </Head>

            <section className="mb-10">
              <SectionHeading title={`ویرایش ${category.name}`} backward />

              <form className="grid grid-cols-6 gap-4">
                <TextInput id='categoryName' label='نام دسته' colSpan={4} value={categoryName} inputHandler={inputHandler} />
                <button onClick={(e) => updateCategoryHandler(e)} type="submit" className="bg-indigo-600 h-12 self-end rounded-md">ذخیره</button>
              </form>

            </section>
          </>
          :
          <div className="flex justify-between">
            <p>دسته مورد نظر موجود نیست</p>
            <i onClick={() => router.back()} className={`bi ${ router.locale === 'en' ? 'bi-arrow-right': 'bi-arrow-left'} text-3xl cursor-pointer hover:text-indigo-400`}></i>
          </div>
      }


    </DashboardLayout>
  )

}

export default EditSubCategories;