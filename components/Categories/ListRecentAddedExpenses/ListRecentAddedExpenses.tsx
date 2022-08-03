import {useSelector} from "react-redux";
import {AppState} from "../../../redux";
import {Expense, searchExpenses} from "../../../services/expenses";
import {useEffect, useState} from "react";

export default function ListRecentAddedExpenses({className, category} : {className : string, category}) {

    const {user, categories} = useSelector((state: AppState)=> state)
    const [expenses, setExpenses] = useState<Array<Expense>>([])



    useEffect(() => {
        const handleRecentAddedExpenses = async () => {
            const response = await searchExpenses(user.token, {search:'',category: category._id, sortBy: "date", page: 1, itemsPerPage: 5, desc: 1, minValue: '' , maxValue:'', minDate: '', maxDate: ''})
            setExpenses(response.data.expenses)
        }
        handleRecentAddedExpenses()
    } , [setExpenses])

    const ListHeader = () => {
        return <div className="flex ">
            <p className="flex-1">Nombre</p>
            <p className="flex-1">Importe</p>
            <p className="flex-1">Fecha</p>
            <p className="flex-1">Categoria</p>
        </div>
    }
    const ListBody = ({expenses}) => {
        return expenses ? <div>
            {expenses.map( (expense) => <ExpenseRow expense={expense} key={expense._id} /> )}
        </div> : <p>Loading...</p>
    }

    const ExpenseRow = ({expense, key}) => {
        return <div className="flex " key={key}>
            <p className="flex-1">{expense.name}</p>
            <p className="flex-1">{expense.value}</p>
            <p className="flex-1">{expense.date}</p>
            <p className="flex-1">{categories.find((element) => element._id === expense.categoryID).name}</p>
        </div>
    }

    return <section className={`p-3 ${className}`}>
        <h1 className="text-2xl">Gastos recientes de {category.name}</h1>
        <ListHeader />
        <ListBody expenses={expenses}/>
    </section>
}
