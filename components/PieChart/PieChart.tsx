import { useEffect, useState } from "react"
import { getTotalCategory } from "../../services/expenses"
import style from "./PieChart.module.css"
import Chart from "react-google-charts";

interface Results {
    _id:string,
    totalExpenses:number
}


interface Color{
    color:string
}

interface ChartData {
    colors: Array<Color>
    values: Array<Array<string|number>>
}



export default function PieChart (props){
    const {currentCategories, token} = props
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
        results?.map(element => {
            let category = getCategory(element._id)
            console.log(category)
            array.push([category.name, element.totalExpenses])
            color.push({color:category.color})
        })
        setChartData({values:array, colors:color})


    }
    console.log(chartData)
    console.log(error || results)
    

    useEffect(() => {
        createChartData()
    }, [results])

    useEffect(() => {
        fetchTotals(token)
    }, [])

    const pieOptions = {
        title: "",
        pieHole: 0.5,
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
        },
        chartArea: {
          left: 0,
          top: 0,
          width: "100%",
          height: "80%"
        }
       
      };


      console.log(chartData.values)



    return <div className={style.PieChart}>
        
        <Chart
          chartType="PieChart"
          data={chartData.values}
          options={pieOptions}
          graph_id="PieChart"
          width={"100%"}
          className={style.PieChart__chart}
          height={"400px"}
          legend_toggle
        />
    </div>
}