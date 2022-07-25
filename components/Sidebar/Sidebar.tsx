import Link from "next/link"
import { useState } from "react"
import Button from "./Button"
import Hamburger from "./Hamburger"
import styles from  "./Sidebar.module.css"


export default function Sidebar() {
    const [sideOpen, setSideOpen] = useState(false)

    return (
            <nav className={sideOpen?`${styles.Sidebar} ${styles.Sidebar__open}`:`${styles.Sidebar}`}>
                <div className={styles.Sidebar__hamburger__container} onClick={()=>setSideOpen(!sideOpen)}><Hamburger isOpen={sideOpen}/></div>
                <div className={styles.Sidebar__list}>
                    <Button text="Home" link="home"/>
                    <Button text="Gastos" link="search"/>
                    <Button text="Categorias" link=""/>
                    <Button text="Perfil" link=""/>
                </div>
            </nav>
    )
}