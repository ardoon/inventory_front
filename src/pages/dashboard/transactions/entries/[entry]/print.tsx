import Head from "next/head"
import { useEffect, useState } from "react"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import callApi from "@/helpers/callApi";
import { useRouter } from "next/router";
import Entry from "@/models/entry";
import { DateObject } from "react-multi-date-picker";
import useAuth from "@/hooks/useAuth";

const PrintEntry = () => {

  const router = useRouter();

  const { user, error, loading } = useAuth();

  if (error) {
    router.push('/');
    return <></>;
  }

  const [entry, setEntry] = useState<Partial<Entry> | undefined>();

  useEffect(() => {
    if (router.query.entry) {
      callApi().get(`/entries/${router.query.entry}`).then((res) => {
        setEntry({
          date: new DateObject(res.data.date).convert(persian, persian_fa),
          receptNo: res.data.receptNo,
          userId: res.data.user.id,
          userName: res.data.user.name,
          warehouseId: res.data.warehouse.id,
          warehouseName: res.data.warehouse.name,
          records: res.data.records
        });
      });
    }
  }, [router.query.entry]);



  return (

    <div className="bg-white min-h-screen w-full pt-4">
      <Head>
        <title>{`SamCity | چاپ ورودی`}</title>
      </Head>

      <div className="w-[210mm] mx-auto px-5 py-5">

        <div className="pb-3">
          <h3 className="text-center text-2xl font-bold">تعاونی مسکن دانشگاه فرهنگیان</h3>
          <h5 className="text-center pt-3">«برگه ورود به انبار»</h5>
          <div className="mt-16 text-sm">
            <div className="grid grid-cols-6">
              <div className="col-span-2">تاریخ: {(entry?.date)?.toString()}</div>
              <div className="col-span-2">شناسه: {entry?.receptNo}</div>
            </div>
            <div className="grid grid-cols-6 mt-5">
              <div className="col-span-2">وارد کننده: {entry?.userName}</div>
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
              <th className="py-2 border-r border-black">قیمت واحد <small>(ریال)</small></th>
              <th className="py-2 border-r border-black">قیمت <small>(ریال)</small></th>
            </tr>
          </thead>

          <tbody className="text-tiny">
            {
              entry?.records?.map((record, index) => {
                return (
                  <tr className="border-b border-black">
                    <td className="py-2 print:border-r print:border-black">{index + 1}</td>
                    <td className="py-2 border-r border-black">{record?.product?.name}</td>
                    <td className="py-2 border-r border-black">{record.amount}</td>
                    <td className="py-2 border-r border-black">{record.price}</td>
                    <td className="py-2 border-r border-black">{+record.price * +record.amount}</td>
                  </tr>
                )
              })
            }
          </tbody>

          <tfoot className="page-footer">
            <tr>
              <td className="h-16 border-t border-black" colSpan={5}>
                <div className="grid grid-cols-8 justify-center items-center text-tiny">
                  <div className="col-span-1">تحویل دهنده</div>
                  <div className="col-span-1">تحویل گیرنده</div>
                  <div className="col-span-2">سرپرست/مسئول مربوطه</div>
                  <div className="col-span-1">امور مالی</div>
                  <div className="col-span-1">دفتر فنی</div>
                  <div className="col-span-1">سرپرست کارگاه</div>
                  <div className="col-span-1">نظارت</div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>

      </div>

    </div>

  )

}

export default PrintEntry;