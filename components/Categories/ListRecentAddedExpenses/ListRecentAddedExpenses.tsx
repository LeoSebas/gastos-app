import {useSelector} from "react-redux";
import {AppState} from "../../../redux";
import {Expense, searchExpenses} from "../../../services/expenses";
import {useEffect, useState} from "react";

export default function ListRecentAddedExpenses({className, category}: { className: string, category }) {

    const {user} = useSelector((state: AppState) => state)
    const [expenses, setExpenses] = useState<Array<Expense>>([])


    useEffect(() => {
        const handleRecentAddedExpenses = async () => {
            const response = await searchExpenses(user.token, {
                search: '',
                category: category._id,
                sortBy: "date",
                page: 1,
                itemsPerPage: 5,
                desc: -1,
                minValue: '',
                maxValue: '',
                minDate: '',
                maxDate: ''
            })
            setExpenses(response.data.expenses)
        }
        handleRecentAddedExpenses()
    }, [setExpenses, category, user])

    const ListHeader = () => {
        return <div className="flex rounded-2xl p-1 m-1 bg-black bg-opacity-20" >
            <p className="flex-1 p-1 underline font-bold">Nombre</p>
            <p className="flex-1 p-1 underline font-bold">Importe</p>
            <p className="flex-1 p-1 underline font-bold">Fecha</p>
        </div>
    }
    const ListBody = ({expenses}) => {
        return expenses ? <div>
            {expenses.map((expense) => <ExpenseRow expense={expense} id={expense._id} key={expense._id}/>)}
        </div> : <p>Loading...</p>
    }

    const ExpenseRow = ({expense, id}) => {
        const formattedTime = new Date(expense.date).toISOString().slice(11,16);
        const formattedDate = new Date(expense.date).toISOString().slice(0,10).replace('-','/').replace('-','/')
        return <div className="flex rounded-2xl p-1 bg-black bg-opacity-10 m-1" key={id}>
            <p className="flex-1 p-1 font-light">{expense.name}</p>
            <p className="flex-1 p-1 font-light">${expense.value}</p>
            <p className="flex-1 p-1 font-light">{formattedDate + ' - ' + formattedTime}</p>
        </div>
    }

    return <section className={`p-3 rounded-2xl m-5 bg-cyan-100 ${className}`} >
        <h1 className="text-2xl">Gastos recientes de {category.name}</h1>
        <ListHeader/>
        <ListBody expenses={expenses}/>
    </section>
}
