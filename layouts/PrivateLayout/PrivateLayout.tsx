import Footer from "../../components/Footer"
import Nav from "../../components/Nav"
import Sidebar from "../../components/Sidebar"
import style from "./PrivateLayout.module.css"

export default function PrivateLayout ({children}){
    return (
        <div className={style.PrivateLayout}>
            <div className={style.PrivateLayout__sidebar}>
                <Sidebar/>
            </div >

            <div className={style.PrivateLayout__main}>
                <div className={style.PrivateLayout__nav}>
                <Nav/>
                </div>
                {children}
                <Footer/>
            </div >
        </div>
    )
}

