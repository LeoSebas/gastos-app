import NavHeader from "./NavHeader";
import NavItemList from "./NavItemList";
import NavItem from "./NavItem";
import Link from "next/link";

export default function Nav() {
    return (<nav className="w-full  flex flex-col items-center border">
        <div className="container h-[70px] flex justify-between items-center ">
            <NavHeader>
               <Link href="/"><p>Ahorrar+</p></Link>
            </NavHeader>
            <NavItemList>
                <NavItem title="Acerca de" href="/about"></NavItem>
                <NavItem title="Iniciar sesión" href="/login"></NavItem>
                <NavItem title="Registrarse"></NavItem>
            </NavItemList>
        </div>
    </nav>);
}