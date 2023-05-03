import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import ShortcutBox from "@/components/partials/dashboard/shortcut-box"
import Categories from "@/components/products/categories"
import SubCategoriesC from "@/components/products/sub-categories-c"
import Category from "@/models/category"
import { RootState } from "@/store/store"
import Head from "next/head"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

const SubCategories = () => {

  const { t } = useTranslation()

  const router = useRouter();

  // function findCategory(categories: Category[]) {
  //   return categories.find((cate) => {
  //     if(cate.children) {
  //       findCategory(cate.children)
  //     }
  //     return cate.id === router.query.category
  //   })
  // }

  function findById(data: Category[], id: string) {
    function iter(a: Category) {
      if (a.id === id) {
        result = a;
        return true;
      }
      return Array.isArray(a.children) && a.children.some(iter);
    }

    let result;
    data.some(iter);
    return result
  }

  const category = useSelector((state: RootState) =>
    findById(state.categories, router.query.category as string)
  )

  // const category = findById(categories, router.query.category as string)

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | زیر دسته`}</title>
      </Head>

      {
        category ?
          <>
            <header className="mb-10">
              <SectionHeading title={category.name} backward={true} />

              <div className="h-48 grid grid-cols-3 gap-6 mb-10">
                <ShortcutBox label='لیست کالاها' icon='archive' link='list/مصالح-مصرفی-کارگاه' />
                <ShortcutBox label='ویرایش دسته' icon='pencil-square' link='edit/مصالح-مصرفی-کارگاه' />
                <ShortcutBox label='حذف دسته' icon='trash' iconColor="rose-400" link='/' />
              </div>

            </header>

            <SubCategoriesC title='زیر دسته ها' id={category.id} categories={category.children} />
          </>

          : <p>دسته یافت نشد</p>
      }



    </DashboardLayout>
  )

}

export default SubCategories;