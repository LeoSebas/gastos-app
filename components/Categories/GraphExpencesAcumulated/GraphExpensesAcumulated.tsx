import {Expense} from "../../../services/expenses";
import {differenceInDays} from "date-fns";
import {useEffect, useState} from "react";
import Chart from "react-google-charts";

enum GraphStatus {
    loading,
    success,
    failure
}

interface StateGraph {
    data?: string[][],
    status: GraphStatus
}

export const options = {
    hAxis: {title: "Días", titleTextStyle: {color: "#333"}},
    vAxis: {minValue: 0},
    chartArea: {width: "50%", height: "70%", backgroundColor: "transparent"},
    backgroundColor: 'transparent',
};

export default function GraphExpensesAcumulated({expenses , className}: { expenses: Array<Expense>, className: string}) {

    const [stateGraph, setStateGraph] = useState<StateGraph>({status: GraphStatus.loading})

    const loadDataGraph = () => {
        const today = new Date(Date.now())
        const firtDayMonth = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0)
        const actualDays = differenceInDays(today, firtDayMonth) + 1

        let data = [["Dia", "Gasto acumulado"]]
        let values = [[]]

        for (let i = 1; i <= actualDays; i++) {
            let filtered = expenses?.filter((value) => {
                const date = new Date(new Date(value.date).toISOString())
                console.log(date)
                return date.getDay() === i
            })
            let acum = 0;
            filtered?.forEach((element) => {
                console.log(element.value)
                acum = element.value + acum
            })
            let prev = values.length >= 1 ? values.at(i - 1).at(1) ?? 0 : 0
            values.push([`${i}/${today.getMonth()}`, prev + acum ?? 0])
        }
        values.shift()
        console.log(values)
        data = [...data, ...values]
        console.log(data)
        setStateGraph({status: GraphStatus.success, data: data})
    }
    useEffect(() => {
        loadDataGraph()
    }, [])

    return (<div className={`p-3 rounded-2xl m-5 bg-cyan-100 ${className}`}>
            <h1 className="text-2xl">Gastos del mes acumulados</h1>
        {
            stateGraph.status === GraphStatus.success ? <Chart
                chartType="AreaChart"
                width="100%"
                height="400px"
                data={stateGraph.data}
                options={options}
            /> : <div className="w-full h-[400px] animate-pulse">
                <p>Loading...</p>
            </div>
        }
    </div>


    );
}