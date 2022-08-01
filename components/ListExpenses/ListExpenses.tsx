import {ExpenseRow} from "./ExpenseRow"
import style from "./ListExpenses.module.css"
import {useState} from "react";
import {Dialog} from "@mui/material";
import ExpenseForm from "../ExpenceForm";
import {ExpenseFormAction} from "../ExpenceForm/ExpenseForm";
import DeleteExpenseDialog from "../DeleteExpenseDialog";
import {Expense} from "../../services/expenses";



export default function ListExpenses(props){
    const {results, userCategories, setReload, reload  } = props

    /// State y handlers para los modals de las opciones
    const [showModifyExpense, setShowModifyExpense] = useState<boolean>(false)
    const [showDeleteExpense, setShowDeleteExpense] = useState<boolean>(false)

    function reloadExpenses () {
        setReload(!reload)
    }

    /// State que contiene la Expense seleccionada
    const [selectedExpense, setSelectedExpense] = useState<Expense | undefined>()
    const handleClickModifyExpense = (_id) => {
        const currentExpense = results?.expenses?.find((e) => {return e._id === _id})
        setSelectedExpense({...currentExpense, date: currentExpense.date.slice(0,16) })
        setShowModifyExpense(true)
    }
    const handleClickDeleteExpense = (_id) => {
        setSelectedExpense(results?.expenses?.find((e) => {return e._id === _id}))
        setShowDeleteExpense(true)
    }

    const handleClose = () => {
        setSelectedExpense(undefined)
        setShowDeleteExpense(false)
        setShowModifyExpense(false)
    }

    function getCategory(id:string){
        return userCategories[userCategories.findIndex(category =>{
            return category._id === id
        })]
    }
    const ExpenseHeader = ( ) => {
        return <ExpenseRow name="Nombre" date="Fecha" value="Importe" category="Categoría"/>
    }


    return (
        <div className={style.ListExpenses}>
            <div className={style.ListExpenses__list}>
                <ExpenseHeader />
                {results?.expenses.map((expense)=> <ExpenseRow open={(showDeleteExpense || showModifyExpense) && expense._id === selectedExpense._id} key={expense._id} _id={expense._id} name={expense.name} date={expense.date} value={expense.value} options={true} category={getCategory(expense.categoryID).name}  color={getCategory(expense.categoryID).color} handleModify={handleClickModifyExpense} handleDelete={handleClickDeleteExpense}/>)}
            </div>
            <Dialog open={showModifyExpense} aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description" onClose={handleClose}>
                <ExpenseForm action={ExpenseFormAction.modify} expense={selectedExpense} dismiss={handleClose} handleReload={reloadExpenses} />
            </Dialog>
            <Dialog open={showDeleteExpense} aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description" onClose={handleClose}>
                <DeleteExpenseDialog expense={{expenseID:selectedExpense?._id}} handleClose={handleClose} handleReload={reloadExpenses}/>
            </Dialog>
        </div>
    )
}
