import Link from "next/link";

export default function NavItem({title, href, onClick}: {title :string, href?: string, onClick?: () => void}  ) {
    const style = "italic p-3 border-b-2 border-white hover:cursor-pointer hover:border-black"
    return (
        href ? <Link href={href}><p className={style + ' '}>{title}</p></Link> : <div className={style} onClick={onClick}>
            <p>{title}</p>
        </div>)
}