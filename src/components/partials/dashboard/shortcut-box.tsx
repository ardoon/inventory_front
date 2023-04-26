import Link from "next/link";

type inputProps = {
    label: string,
    icon: string,
    link: string,
    iconColor?: string
}

export default function ShortcutBox(props: inputProps) {

    return (
        <Link href={props.link} className="h-full bg-slate-900 rounded-md text-center hover:bg-gray-800">

            <i className={`bi bi-${props.icon} ${ props.iconColor ? 'text-' + props.iconColor : 'text-indigo-400'} text-5xl block mt-12 mb-4`}></i>

            <span className="font-bold text-gray-400">{props.label}</span>

        </Link>
    )
}