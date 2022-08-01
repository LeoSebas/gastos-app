import { useEffect, useState } from "react"
import { getTotalCategory } from "../../services/expenses"
import style from "./PieChart.module.css"


export default function PieChart (props){
    const {currentCategories, token} = props
    const [error, setError] = useState("")
    const [results, setResults] = useState()


    const fetchTotals = async (token:string):Promise<any> => {
        const response = await getTotalCategory(token)
        if(!response) {
            setError("Ha ocurrido un error") //Si no hay ninguna respuesta, algo fallo horriblemente
        } else if (response.data.error){//Si hay error, mostrame porque fallo. Esto muestra si los datos puestos son errorneos.
            setError(response.data.msg)
        } else {
            setError("")
            setResults(response.data)
        }
    }

    useEffect(() => {
        fetchTotals(token)
    }, [])
    

    console.log(error || results)
    function getCategory(id:string){
        return currentCategories[currentCategories.findIndex(category =>{
            return category._id === id
        })]
    }
    return <div className={style.Piechart}>PieChart</div>
}