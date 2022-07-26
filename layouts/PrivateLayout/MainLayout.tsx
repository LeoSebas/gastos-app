import Footer from "../../components/Footer"
import Nav from "../../components/Nav"
import Sidebar from "../../components/Sidebar"
import style from "./PrivateLayout.module.css"
import Head from "next/head";

export default function PrivateLayout({children}) {
    if (window.location.pathname.slice(1, 8) === "private") {
        var isPrivate = true
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
                    <Footer/>
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

