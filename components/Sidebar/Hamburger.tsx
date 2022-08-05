
import style from "./Hamburger.module.css"


export default function Hamburger (props){
    const {isOpen} = props
    return <div className={!isOpen? style.hamburger__container: `${style.hamburger__container} ${style.conOpen}`}><span className= {style.hamburger} > </span></div>
}