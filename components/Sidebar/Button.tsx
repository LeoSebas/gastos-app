import Link from "next/link";


export default function Button(props) {
    const {text, link} = props

    return <Link href ={`/private/${link}`} ><button ><a>{text}</a></button></Link>
}