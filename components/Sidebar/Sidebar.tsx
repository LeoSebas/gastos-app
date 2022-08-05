import { useState } from "react"
import Button from "./Button"
import Hamburger from "./Hamburger"
import styles from  "./Sidebar.module.css"


export default function Sidebar() {
    const [sideOpen, setSideOpen] = useState(false)
    window.addEventListener('locationchange', function () {
        setSideOpen(false)
    });

    
    return (<>
                <div className={sideOpen?styles.pusherOpen:styles.pusher}></div> 
                <nav className={sideOpen?`${styles.Sidebar} ${styles.Sidebar__open}`:`${styles.Sidebar}`}>
                    <div className={styles.Sidebar__hamburger__container} onClick={()=>setSideOpen(!sideOpen)}><Hamburger isOpen={sideOpen}/></div>
                    <div className={styles.Sidebar__list}>
                        <Button text="Home" link="home" setSideOpen={setSideOpen}/>
                        <Button text="Gastos" link="search" setSideOpen={setSideOpen}/>
                        <Button text="Categorias" link="categories" setSideOpen={setSideOpen}/>
                        <Button text="Perfil" link="profile" setSideOpen={setSideOpen}/>
                    </div>
                </nav>
            </>
    )
}