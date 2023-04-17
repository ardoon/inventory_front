import { TFunction } from "next-i18next"

export default function InputError({fieldLabel, t}: { fieldLabel: string, t: TFunction }) {

    return (
        <span className="text-tiny text-rose-400 rtl:text-left ltr:text-right block">{ t('error', { context: 'input', fieldName: fieldLabel }) }</span>
    )
    
}