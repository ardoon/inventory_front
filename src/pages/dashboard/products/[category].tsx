import DashboardLayout from "@/components/layouts/dashboard"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import ShortcutBox from "@/components/partials/dashboard/shortcut-box"
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

  const categories: Category[] = useSelector((state: RootState) =>
    state.categories
  )

  const category = categories.find((cate) => cate.id === router.query.category)
  const subCategores = categories.filter((cate) => {
    return cate.parentId === category?.id
  })

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

            <SubCategoriesC title='زیر دسته ها' id={category.id} categories={subCategores} />
          </>

          : <p>دسته یافت نشد</p>
      }



    </DashboardLayout>
  )

}

export default SubCategories;