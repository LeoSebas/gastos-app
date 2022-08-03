import NavHeader from "./NavHeader";
import NavItemList from "./NavItemList";
import NavItem from "./NavItem";
import { useSelector } from "react-redux";
import { AppState } from "../../redux";
import {useRouter} from "next/router";
import NavItemUserProfile from "./NavItemUserProfile";
import Image from "next/image";

export default function Nav() {
    const currentUser = useSelector((state: AppState) => state.user)

    const router = useRouter()

    return (
    <nav className="sticky w-full  flex flex-col items-center ">
        <div className="container h-[70px] flex justify-between items-center ">

            <NavHeader>
                    <Image src="/logo.svg" width={60} height={60} />
            </NavHeader>
            <NavItemList>
                <NavItem title="Acerca de" href="/about"></NavItem>
                {currentUser
                    ? <><NavItemUserProfile user={currentUser}/>
                    </>
                    : <>
                        <NavItem title="Iniciar sesión" href="/login"></NavItem>
                        <NavItem className="rounded-xl bg-cyan-300 text-white" title="Registrarse" href="/register"></NavItem>
                    </>
                }
            </NavItemList>
        </div>
    </nav>);
}