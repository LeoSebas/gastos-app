
import {useSelector} from "react-redux";
import {AppState} from "../../../redux";
import CategoryPageHeader from "../../../components/Categories/CategoryPageHeader";
import {add, sub} from "date-fns";
import {getTotalExpenses} from "../../../services/expenses";
import {useEffect, useState} from "react";

export default function Category({ categoryName }) {
    const {categories, user} = useSelector((state : AppState) => state)

    const category = categories.find((element) => element.name === categoryName)

    const [totalWeek, setTotalWeek] = useState<number>()
    const [totalMonth, setTotalMonth] = useState<number>()


    const setTotales = async () => {
        const today = new Date(Date.now())
        const aSevenDaysAgo = sub(today, {days: 6})
        const aThirtyDaysAgo  = sub(today, {days: 29})

        /// obtengo los resultados para los ultimos 7 días:
        const initialDate = aSevenDaysAgo.toISOString().slice(0,10)
        const lastDate = add(today, {days:1}).toISOString().slice(0,10)
        const response = await getTotalExpenses(initialDate, lastDate, category._id, user.token)
        if ("expenses" in response.data) {
            setTotalWeek(response.data.expenses.find((element) => element._id === category._id)?.totalExpenses ?? null)
        }


        /// obtengo los resultados para los ultimos 30 días:
        const initialDateThirty = aThirtyDaysAgo.toISOString().slice(0,10)
        const lastDateThirty = add(today, {days:1}).toISOString().slice(0,10)
        const responseThirty = await getTotalExpenses(initialDateThirty, lastDateThirty, category._id, user.token)
        if ("expenses" in responseThirty.data) {
            setTotalMonth( responseThirty.data.expenses.find((element) => element._id === category._id)?.totalExpenses ?? null)
        }
    }

    useEffect(() => {
        setTotales()
    } , [ setTotales ,categoryName])


    return <div className="flex flex-col items-center">
        <main className="container p-4 flex flex-1 flex-col items-center justify-center">
            <section className="w-full">
                <p>Pagina de categoria { category.name }</p>
                <CategoryPageHeader category={category} totalSemanal={totalWeek} totalMensual={totalMonth}/>

            </section>
        </main>
    </div>
}

export const getServerSideProps =  async ({params}) => {

    return {
        props: { categoryName : params.category }
    }
}
