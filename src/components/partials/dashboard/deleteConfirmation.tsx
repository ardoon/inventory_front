import { FormEvent } from "react"
import Modal from "./modal"

interface Props {
    title: string,
    description: string,
    handleTrue: (e: FormEvent) => void,
    handleCancel: () => void
}

export default function DeleteConfirmation({ handleCancel, handleTrue, title, description }: Props) {
    return (
        <Modal show={true} setShow={handleCancel}>
            <div className="inline-block w-full max-w-lg my-8 overflow-hidden text-right align-middle transition-all transform bg-slate-900 rounded-lg">
                <div className={`flex items-center pt-5 px-4 text-gray-300`}>
                    <h2 className="text-xl font-bold leading-tight">
                        {title}
                    </h2>
                </div>
                <div className="p-4">
                    <p className="text-gray-400 leading-relaxed text-sm">با تایید این عمل {description} مورد نظر به طور کل حذف میشود و این عمل غیر قابل بازگشت میباشد. آیا همچنان از حذف {description} اطمینان دارید؟</p>
                </div>
                <form onSubmit={(e: FormEvent) => handleTrue(e)}>
                    <div className="p-4 py-4 flex items-center justify-end">
                        <button onClick={handleCancel} type="button"
                            className="inline-flex items-center border font-medium rounded-md focus:outline-none justify-center py-2 px-10 text-sm text-white border-transparent bg-gray-600 hover:bg-gray-700">
                            انصراف
                        </button>
                        <button type="submit"
                            className="inline-flex items-center border mr-4 font-medium rounded-md focus:outline-none justify-center py-2 px-10 text-sm text-white border-transparent bg-rose-600 hover:bg-rose-700">
                            حذف
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}