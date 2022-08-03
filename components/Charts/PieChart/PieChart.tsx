import { useEffect, useState } from "react"
import { getTotalCategory } from "../../../services/expenses"
import style from "./PieChart.module.css"
import Chart from "react-google-charts";

export interface Results {
    _id:string,
    totalExpenses:number
}


export interface Color{
    color:string
}

export interface ChartData {
    colors: Array<Color>
    values: Array<Array<string|number>>
}



export default function PieChart (props){
    const {currentCategories, token, reload} = props
    const [error, setError] = useState("")
    const [results, setResults] = useState<Array<Results>>()
    const [chartData, setChartData] = useState<ChartData>({colors:[], values:[]})


    const fetchTotals = async (token:string):Promise<any> => {
        const response = await getTotalCategory(token)
        if(!response) {
            setError("Ha ocurrido un error") //Si no hay ninguna respuesta, algo fallo horriblemente
        } else if (response.data.error){//Si hay error, mostrame porque fallo. Esto muestra si los datos puestos son errorneos.
            setError(response.data.msg)
        } else {
            setError("")
            setResults(response.data.expenses)
        }
    }

    function getCategory(id:string){
        return currentCategories[currentCategories.findIndex(category =>{
            return category._id === id
        })]
    }

    function createChartData (){
        var array = []
        var color = []
        array.push(["Categoria", "Gastos"])
        if(results){

            results?.map(element => {
                let category = getCategory(element._id)
                array.push([category.name, element.totalExpenses])
                color.push({color:category.color})
            })
            setChartData({values:array, colors:color}) 
        }

    }
    useEffect(() => {
        createChartData()
    }, [results])

    useEffect(() => {
        fetchTotals(token)
    }, [reload])

    const pieOptions = {
        title: "",
        pieHole: 0.5,
        backgroundColor: '#cefdfc',
        slices: chartData.colors,
        legend: {
          position: "bottom",
          alignment: "center",
          textStyle: {
            color: "233238",
            fontSize: 14
          }
        },
        tooltip: {
            ignoreBounds:true,
            isHtml:true
        },
        chartArea: {
            backgroundColor: '#cefdfc',
            left: 0,
            top: 0,
            width:"100%",
            height: "80%"
        }
       
      };
      console.log(results)
    return <div className={style.PieChart}>
        <div>
           {(results.length !==0) && <Chart
            chartType="PieChart"
            data={chartData.values}
            options={pieOptions}
            graph_id="PieChart"
            width="100%"
            className={style.PieChart__chart}
            height={"400px"}
            legend_toggle
            />}
        </div>
    </div>
}