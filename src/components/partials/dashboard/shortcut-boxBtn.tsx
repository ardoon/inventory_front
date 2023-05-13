type inputProps = {
    label: string,
    icon: string,
    iconColor?: string,
    action: Function
}

export default function ShortcutBoxBtn(props: inputProps) {

    return (
        <button type="button" onClick={()=>props.action()} className="h-full bg-slate-900 rounded-md text-center hover:bg-gray-800">

            <i className={`bi bi-${props.icon} ${ props.iconColor ? 'text-' + props.iconColor : 'text-indigo-400'} text-5xl block mt-12 mb-4`}></i>

            <span className="font-bold text-gray-400">{props.label}</span>

        </button>
    )
}