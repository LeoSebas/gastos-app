import Link from "next/link";

export default function NavHeader({children}) {
    return (<div className="hover:cursor-pointer">
        <Link href="/">
            <a className="flex justify-center ">
                {children}
            </a>
        </Link>
    </div>)
}