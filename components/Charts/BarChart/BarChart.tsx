import { useEffect, useState } from "react"
import { getTotalLimit, getTotalPerMonth } from "../../../services/expenses"
import style from "./BarChart.module.css"
import { Results } from "../PieChart/PieChart"
import { getMonth } from "../../../utils/dateUtils"
import Chart from "react-google-charts";
import SetTotalLimit from "../../SetTotalLimit/SetTotalLimit"

export default function BarChart (props){
    const {token, reload} = props
    const [error, setError] = useState("")
    const [results, setResults] = useState<Array<any>>()
    const [chartData, setChartData] = useState<Array<string|number>>([])
    const [limit , setLimit] = useState<number>()

    const fetchTotals = async (token:string):Promise<any> => {
        const response = await getTotalPerMonth(token)
        if(!response) {
            setError("Ha ocurrido un error") //Si no hay ninguna respuesta, algo fallo horriblemente
        } else if (response.data.error){//Si hay error, mostrame porque fallo. Esto muestra si los datos puestos son errorneos.
            setError(response.data.msg)
        } else {
            setError("")
            setResults(response.data.expenses[0])
        }
    }

    const fetchLimit = async (token:string):Promise<any> => {
        const response = await getTotalLimit(token)
        if(!response) {
            setError("Ha ocurrido un error") //Si no hay ninguna respuesta, algo fallo horriblemente
        } else if (response.data.error){//Si hay error, mostrame porque fallo. Esto muestra si los datos puestos son errorneos.
            setError(response.data.msg)
        } else {
            setError("")
            setLimit(parseInt(response.data.totalLimit))
            console.log(response.data)
        }
    }

    
    function arrangeChartData () {
        var array:Array<any> = []
        array.push(['mes',  'Gastos Mensuales', "Límite Mensual"])
        if(results){
        for (var i = 1; i < Object.keys(results).length+1; i++){
            var month = getMonth(i)
            if(results[i] && results[i].length!==0){
                if(limit) {
                    array.push([month, results[i][0].totalExpenses, limit])
                } else {
                    array.push([month,  results[i][0].totalExpenses, 0])
                }
        } else {
            array.push([month, 0, 0])
        }
        }
        
    }
        setChartData(array)
    }



    useEffect(() => {
        fetchTotals(token)
    }, [reload])

    
    useEffect(() => {
       arrangeChartData()
    }, [results, limit])

    const pieOptions = {
        title: "",
        backgroundColor: 'transparent',
        vAxis:{
            format:"short"
        },
        legend: {
          position: "bottom",
          alignment: "center",
          textStyle: {
            color: "233238",
            fontSize: 14
          }
        },
        seriesType:"bars",
        series:{
            1:{type:"line"}
        }, 
        chartArea: {
            backgroundColor: 'transparent',
            width:"80%"
        } 
      };
      console.log(limit)

      useEffect(() => {
        fetchLimit(token)
     }, [])
    return <div className={style.BarChart}>
            <SetTotalLimit token={token} setLimit={setLimit}/>
            <div>
                {(results?.length !==0)?<Chart
                options={pieOptions}
                chartType="ComboChart"
                width={"100%"}
                height={"400px"}
                data={chartData}
                />:<p>Usted no tiene gastos</p>}
            </div>
        </div>
}