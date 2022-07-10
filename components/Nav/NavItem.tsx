import Link from "next/link";

export default function NavItem({title, href}: {title :string, href?: string}  ) {
    const style = "italic  p-3 border-b-2 border-white"
    return (
        href ? <Link href={href}><p className={style + ' hover:cursor-pointer hover:border-black'}>{title}</p></Link> : <div className={style}>
            <p>{title}</p>
        </div>)
}