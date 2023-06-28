import Head from "next/head"
import { useEffect, useState } from "react"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import callApi from "@/helpers/callApi";
import { useRouter } from "next/router";
import { DateObject } from "react-multi-date-picker";
import useAuth from "@/hooks/useAuth";
import Outgo from "@/models/outgo";

const PrintOutgo = () => {

  const router = useRouter();

  const { user, error, loading } = useAuth();

  if (error) {
    router.push('/');
    return <></>;
  }

  const [outgo, setOutgo] = useState<Partial<Outgo> | undefined>();

  useEffect(() => {
    if (router.query.outgo) {
      callApi().get(`/outgoes/${router.query.outgo}`).then((res) => {
        setOutgo({
          date: new DateObject(res.data.date).convert(persian, persian_fa),
          receptNo: res.data.receptNo,
          userId: res.data.user.id,
          userName: res.data.user.name,
          sectionId: res.data.section.id,
          sectionName: res.data.section.name,
          records: res.data.records
        });
      });
    }
  }, [router.query.outgo]);



  return (

    <div className="bg-white min-h-screen w-full pt-4">
      <Head>
        <title>{`SamCity | چاپ خروجی`}</title>
      </Head>

      <div className="w-[210mm] mx-auto px-5 py-5">

        <div className="pb-3">
          <h3 className="text-center text-2xl font-bold">تعاونی مسکن دانشگاه فرهنگیان</h3>
          <h5 className="text-center pt-3">«برگه خروج از انبار»</h5>
          <div className="mt-16 text-sm">
            <div className="grid grid-cols-6">
              <div className="col-span-2">تاریخ: {(outgo?.date)?.toString()}</div>
              <div className="col-span-2">شناسه: {outgo?.receptNo}</div>
            </div>
            <div className="grid grid-cols-6 mt-5">
              <div className="col-span-2">خارج کننده: {outgo?.userName}</div>
              <div className="col-span-2">کاربر سیستم: {user?.name}</div>
            </div>
          </div>
        </div>

        <table className="text-center border border-black w-full mt-6">
          <thead>
            <tr className="text-sm border-b border-black">
              <th className="py-2 border-r border-black">ردیف</th>
              <th className="py-2 border-r border-black">نام کالا</th>
              <th className="py-2 border-r border-black">مقدار</th>
              <th className="py-2 border-r border-black">محل مصرف</th>
              <th className="py-2 border-r border-black">توضیحات</th>
            </tr>
          </thead>

          <tbody className="text-tiny">
            {
              outgo?.records?.map((record, index) => {
                return (
                  <tr className="border-b border-black">
                    <td className="py-2 print:border-r print:border-black">{index + 1}</td>
                    <td className="py-2 border-r border-black">{record?.product?.name}</td>
                    <td className="py-2 border-r border-black">{record.amount}</td>
                    <td className="py-2 border-r border-black">{outgo.sectionName}</td>
                    <td className="py-2 border-r border-black">{record.description}</td>
                  </tr>
                )
              })
            }
          </tbody>

          <tfoot className="page-footer">
            <tr>
              <td className="h-16 border-t border-black" colSpan={5}>
                <div className="grid grid-cols-2 justify-center items-center text-tiny">
                  <div className="col-span-1">تحویل دهنده</div>
                  <div className="col-span-1">تحویل گیرنده</div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>

      </div>

    </div>

  )

}

export default PrintOutgo;