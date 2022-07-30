import Footer from "../../components/Footer"
import Nav from "../../components/Nav"
import Sidebar from "../../components/Sidebar"
import style from "./PrivateLayout.module.css"
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { appSlice, AppState } from "../../redux";
import {useRouter} from "next/router";
import { checkToken } from "../../services/auth";


export default function PrivateLayout({children}) {
    const router = useRouter()
    const dispatch = useDispatch()
    if (window.location.pathname.slice(1, 8) === "private") {
        var isPrivate = true
        const currentUser = useSelector((state: AppState) => state.user)
        if (!currentUser || !currentUser.token) {
            router.push('/login')
            return <></>
        }
        const userStatus = async () => {
            const response = await checkToken(currentUser.token)
            if (!response) {
                console.log(response?.data?.msg)
            } else if(response.data.notLogged){
                dispatch(appSlice.actions.userChanged(null))
                dispatch(appSlice.actions.setCategories(null))
                router.push('/login')
                return <></>
            }
        }
        userStatus()

    }

    
    return (
        (isPrivate) ?
            <div className={style.PrivateLayout}>

                {<div className={style.PrivateLayout__sidebar}>
                    <Sidebar/>
                </div>}

                <div className={style.PrivateLayout__main}>
                    <div className={style.PrivateLayout__nav}>
                        <Nav/>
                    </div>
                    <div className={style.PrivateLayout__children}>
                        {children}
                    </div>
                    <div className={style.PrivateLayout__footer}>
                    <Footer/>
                    </div>
                </div>
            </div>
:
    <>
        <Nav/>
        {children}
        <Footer/>
    </>

)
}

