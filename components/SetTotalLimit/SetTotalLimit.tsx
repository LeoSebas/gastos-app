import { useRef, useState } from "react"
import style from "./SetTotalLimit.module.css"
import { setTotalLimit } from "../../services/expenses"


export default function SetTotalLimit (props) {
    const {token, setLimit} = props
    const [ error, setError] = useState("")
    const newLimitRef = useRef<HTMLInputElement>(null);

    const postLimit = async ():Promise<any> => {
        const response = await setTotalLimit(token, parseInt(newLimitRef.current?.value))
        if(!response) {
            setError("Ha ocurrido un error") //Si no hay ninguna respuesta, algo fallo horriblemente
        } else if (response.data.error){//Si hay error, mostrame porque fallo. Esto muestra si los datos puestos son errorneos.
            setError(response.data.msg)
        } else {
            setError("")
            setLimit(parseInt(newLimitRef.current?.value))
        }
    }


    return (
    <div className={style.SetTotalLimit}>
        <input className={style.SetTotalLimit__input} placeholder="Modifique su límite" ref={newLimitRef}></input>
        <button className={style.SetTotalLimit__button} onClick={()=>postLimit()}>Cambiar</button>
    </div>)
}