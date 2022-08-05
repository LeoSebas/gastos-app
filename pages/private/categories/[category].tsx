
import {useSelector} from "react-redux";
import {AppState} from "../../../redux";
import CategoryPageHeader from "../../../components/Categories/CategoryPageHeader";
import {add, sub} from "date-fns";
import {Expense, getTotalExpenses, searchExpenses} from "../../../services/expenses";
import {useEffect, useState} from "react";
import ListRecentAddedExpenses from "../../../components/Categories/ListRecentAddedExpenses";
import GraphExpensesAcumulated from "../../../components/Categories/GraphExpencesAcumulated";
import CustomHead from "../../../components/CustomHead";

export default function Category({ categoryName }) {
    const {categories, user} = useSelector((state : AppState) => state)

    const category = categories.find((element) => element.name === categoryName)

    const [totalWeek, setTotalWeek] = useState<number>()
    const [totalMonth, setTotalMonth] = useState<number>()

    const [expensesMonth, setExpensesMonth] = useState<Array<Expense>>(null)


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

    const getMonthlyExpenses = async () => {
        const today = add(new Date(Date.now()),{days:1})
        const minDate = new Date(today.getFullYear(),today.getMonth(),1,0,0)
        const response = await searchExpenses(user.token,{
            search: '',
            category: category._id,
            sortBy: "date",
            page: '',
            itemsPerPage: 10000,
            desc: 1,
            minValue: '',
            maxValue: '',
            minDate: minDate.toISOString().slice(0,10),
            maxDate: today.toISOString().slice(0,10)
        } )
        console.log(response.data)
        setExpensesMonth(response.data.expenses)
    }

    useEffect(() => {
        setTotales()
        getMonthlyExpenses()
    } , [ categoryName])


    return <div className="flex flex-col items-center">
        <CustomHead title={"Ahorrar+ - Categoria"} />
        <main className="container p-4 flex flex-1 flex-col items-center justify-center">
            <section className="w-full">
                <p>Pagina de categoria { category.name }</p>
                <CategoryPageHeader category={category} totalSemanal={totalWeek} totalMensual={totalMonth}/>
                <div className="flex flex-col lg:flex-row">
                    <ListRecentAddedExpenses className="w-12/12 lg:w-6/12" category={category}/>
                    {
                        expensesMonth ? <GraphExpensesAcumulated expenses={expensesMonth} className="w-12/12 lg:w-6/12"/> : <></>
                    }
                </div>


            </section>
        </main>
    </div>
}

export const getServerSideProps =  async ({params}) => {

    return {
        props: { categoryName : params.category }
    }
}
