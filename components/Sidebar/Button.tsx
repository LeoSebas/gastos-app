import Link from "next/link";


export default function Button(props) {
    const {text, link, setSideOpen} = props

    return <Link href ={`/private/${link}`} ><button onClick={()=>setSideOpen(false)}><a>{text}</a></button></Link>
}