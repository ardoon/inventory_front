import Link from "next/link";

type inputProps = {
    label: string,
    link: string
}

export default function SubMenuItem(props: inputProps) {

    return (
        <li className="hover:text-indigo-400">
            <Link href={props.link}>
                {props.label}
            </Link>
        </li>
    )
}