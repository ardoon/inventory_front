
export default function EntryRecordRow({no,record}: {no: number, record: any}) {

    return (
        <tr className="space-x-2">
            <td className="flex items-center h-10 justify-center">{no+1}</td>
            <td><input type='text' className="bg-slate-800 border-none rounded-sm w-full" /></td>
            <td><input type='text' className="bg-slate-800 border-none rounded-sm w-full" /></td>
            <td><input type='text' className="bg-slate-800 border-none rounded-sm w-full" /></td>
            <td><input type='text' className="bg-slate-800 border-none rounded-sm w-full" /></td>
            <td><input type='text' className="bg-slate-800 border-none rounded-sm w-full" /></td>
            <td className="pt-1"><i className="bi bi-trash3 cursor-pointer text-rose-400"></i></td>
          </tr>
    )
}