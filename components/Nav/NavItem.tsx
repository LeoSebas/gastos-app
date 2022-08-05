import Link from "next/link";

export default function NavItem({title, href, onClick, className}: { title: string, href?: string, onClick?: () => void, className?: string }) {
    const style = `font-semibold p-3 hover:cursor-pointer ${className}`
    return (
        href ? <Link href={href}><p className={style + ' '}>{title}</p></Link> :
            <div className={style} onClick={onClick}>
                <p>{title}</p>
            </div>)
}