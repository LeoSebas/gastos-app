import { useEffect, useState } from "react"
import { getTotalPerMonth } from "../../../services/expenses"
import style from "./BarChart.module.css"
import { Results } from "../PieChart/PieChart"
import { getMonth } from "../../../utils/dateUtils"
import Chart from "react-google-charts";

export default function BarChart (props){
    const {token, reload} = props
    const [error, setError] = useState("")
    const [results, setResults] = useState<Array<any>>()
    const [chartData, setChartData] = useState<Array<string|number>>([])


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

    
    function arrangeChartData () {
        var array = []
        array.push(['mes', 'Gastos'])
        if(results){
        for (var i = 1; i < Object.keys(results).length+1; i++){
            var month = getMonth(i)
            if(results[i] && results[i].length!==0){
            array.push([month, results[i][0].totalExpenses])
        } else {
            array.push([month, 0])
        }
        }}
        setChartData(array)
    }



    useEffect(() => {
        fetchTotals(token)
    }, [reload])

    
    useEffect(() => {
       arrangeChartData()
    }, [results])

    const pieOptions = {
        title: "",
        backgroundColor: 'transparent',
        legend: {
          position: "bottom",
          alignment: "center",
          textStyle: {
            color: "233238",
            fontSize: 14
          }
        }, 
        chartArea: {
            backgroundColor: 'transparent'
        } 
      };
    
      console.log(results)
    return <div className={style.BarChart}>
            <div>

                {(results.length !==0)&&<Chart
                options={pieOptions}
                chartType="ColumnChart"
                width={"550px"}
                height={"400px"}
                data={chartData}
                />}
            </div>
        </div>
}