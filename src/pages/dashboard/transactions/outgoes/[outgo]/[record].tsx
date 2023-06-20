import DashboardLayout from "@/components/layouts/dashboard"
import TextInputDynamic from "@/components/partials/dashboard/TextInput-dynamic"
import TextInputDynamicNumber from "@/components/partials/dashboard/TextInput-dynamicNumber"
import TextInputWithData from "@/components/partials/dashboard/TextInput-with-data"
import DeleteConfirmation from "@/components/partials/dashboard/deleteConfirmation"
import SectionHeading from "@/components/partials/dashboard/section-heading"
import callApi from "@/helpers/callApi"
import OutgoRecord from "@/models/outgoRecord"
import Record from "@/models/record"
import Head from "next/head"
import { useRouter } from "next/router"
import { FormEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"


const EditRecord = () => {

  const router = useRouter();

  const [record, setRecord] = useState<Partial<OutgoRecord> | undefined>();

  useEffect(() => {
    if (router.query.record) {
      callApi().get(`/outgoes/records/${router.query.record}`).then((res) => {
        setRecord({
          productId: res.data.product.id,
          amount: res.data.amount,
          unitId: res.data.unit.id,
          description: res.data.description,
          productName: res.data.product.name,
          unitName: res.data.unit.name
        });
      });
    }
  }, [router.query.record]);

  function inputHandler(key: string, value: string | number, content?: string) {
    if (content) {
      if (key === 'productId') {
        setRecord({
          ...record,
          productId: value as number,
          productName: content
        })
      } else if (key === 'unitId') {
        setRecord({
          ...record,
          unitId: value as number,
          unitName: content
        })
      }
    } else {
      setRecord({
        ...record,
        [key]: value
      })
    }
  }

  async function saveData(e: FormEvent) {
    e.preventDefault();
    if (record?.productId && record?.amount && record.unitId) {
      try {
        const result = await callApi().patch(`/outgoes/records/${router.query.record}`, {
          productId: record.productId,
          amount: +record.amount,
          unitId: record.unitId,
          description: record.description,
        });
        if (result.data.id) {
          toast.success('با موفقیت انجام شد')
          router.push(`/dashboard/transactions/outgoes/${router.query.outgo}`)
        }
      } catch (err) {
        toast.error(`Error: ${err}`)
      }
    }
  }

  const deleteRecordHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await callApi().delete(`/outgoes/records/${router.query.record}`)
      toast.warning('رکورد مورد نظر حذف شد')
      router.push(`/dashboard/transactions/outgoes/${router.query.outgo}`)
    } catch (err) {
      console.log(err);
    }

  }

  const setShowModal = (show = true) => {
    router.push(`/dashboard/transactions/outgoes/${router.query.outgo}/${router.query.record}/${show ? '?confirm' : ''}`)
  }

  return (
    <DashboardLayout>
      <Head>
        <title>{`SamCity | ویرایش رکورد`}</title>
      </Head>

      <SectionHeading title="ویرایش رکورد وارد شده" backward />

      <table className="mt-10 w-full text-sm border-separate border-spacing-2">
        <thead>
          <tr>
            <th>کالا</th>
            <th>مقدار</th>
            <th>واحد</th>
            <th>توضیحات</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {record?.productName ? <TextInputWithData defaultValue={record.productName} colSpan={1} id="productId" label="" dataKey={`products`} inputHandler={inputHandler} /> : <p>Loading..</p>}
            </td>
            <td>
              <TextInputDynamicNumber value={record?.amount as number} colSpan={1} id="amount" label="" inputHandler={inputHandler} />
            </td>
            <td>
              {
                record?.productId ? <TextInputWithData defaultValue={record.unitName} colSpan={1} id="unitId" label="" dataKey={`products/units/${record?.productId}`} inputHandler={inputHandler} />
                  : <TextInputDynamic colSpan={1} id="unitId" label="" inputHandler={inputHandler} isDisable />
              }
            </td>
            <td>
              <TextInputDynamic value={record?.description} colSpan={1} id="description" label="" inputHandler={inputHandler} />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="grid grid-cols-6 gap-4">
        <button onClick={(e) => saveData(e)} type="submit" className="bg-indigo-600 col-span-5 hover:bg-indigo-700 rounded-md h-12 mt-4">اعمال تغییرات</button>
        <span onClick={() => setShowModal(true)} className="bg-rose-600 cursor-pointer flex items-center justify-center hover:bg-rose-700 rounded-md h-12 col-span-1 mt-4 mb-10">حذف</span>
      </div>

      {
        'confirm' in router.query && <DeleteConfirmation title="حذف خروجی" description="خروجی" handleTrue={deleteRecordHandler} handleCancel={() => setShowModal(false)} />
      }

    </DashboardLayout>
  )

}

export default EditRecord;