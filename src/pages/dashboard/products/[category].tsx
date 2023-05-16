import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import ShortcutBox from "@/components/partials/dashboard/shortcut-box"
import ShortcutBoxBtn from "@/components/partials/dashboard/shortcut-boxBtn"
import SubCategoriesC from "@/components/products/sub-categories-c"
import Category from "@/models/category"
import { deleteCategory } from "@/store/slices/categoriesSlice"
import { AppDispatch, RootState } from "@/store/store"
import Head from "next/head"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"

const SubCategories = () => {

  const router = useRouter();

  const categories: Category[] = useSelector((state: RootState) =>
    state.categories
  )

  const category = categories.find((cate) => cate.id === router.query.category)
  const subCategores = categories.filter((cate) => {
    return cate.parentId === category?.id
  })

  const dispatch = useDispatch<AppDispatch>();
  
  const deleteCategoryHandler = () => {


    dispatch(deleteCategory(category?.id as string))
    router.back()

  }

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | زیر دسته`}</title>
      </Head>

      {
        category ?
          <>
            <header className="mb-10">
              <SectionHeading title={category.name} backward />

              <div className="h-48 grid grid-cols-3 gap-6 mb-10">
                <ShortcutBox label='لیست کالاها' icon='archive' link={`list/${category.id}`} />
                <ShortcutBox label='ویرایش دسته' icon='pencil-square' link={`edit/${category.id}`} />
                <ShortcutBoxBtn label='حذف دسته' icon='trash' iconColor="rose-400" action={deleteCategoryHandler} />
              </div>

            </header>

            <SubCategoriesC title='زیر دسته ها' id={category.id} categories={subCategores} />
          </>

          : <p>دسته یافت نشد</p>
      }



    </DashboardLayout>
  )

}

export default SubCategories;