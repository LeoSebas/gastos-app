import NavHeader from "./NavHeader";
import NavItemList from "./NavItemList";
import NavItem from "./NavItem";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {appSlice, AppState} from "../../redux";
import {useRefreshRoot} from "next/dist/client/streaming/refresh";
import {useRouter} from "next/router";

export default function Nav() {
    const currentUser = useSelector((state: AppState) => state.user)
    const dispatch = useDispatch()
    const router = useRouter()

    return (<nav className="w-full  flex flex-col items-center border">
        <div className="container h-[70px] flex justify-between items-center ">
            <NavHeader>
                <Link href="/"><p>Ahorrar+</p></Link>
            </NavHeader>
            <NavItemList>
                <NavItem title="Acerca de" href="/about"></NavItem>
                {currentUser
                    ? <NavItem title="Cerrar sesión" onClick={() => {
                        dispatch(appSlice.actions.userChanged(null))
                    }}></NavItem>
                    : <>
                        <NavItem title="Iniciar sesión" href="/login"></NavItem>
                        <NavItem title="Registrarse" href="/register"></NavItem>
                    </>
                }
            </NavItemList>
        </div>
    </nav>);
}