import Link from "next/link";


export default function Button(props) {
    const {text, link} = props

    return <button><Link href ={`/private/${link}`}><a>{text}</a></Link></button>
}