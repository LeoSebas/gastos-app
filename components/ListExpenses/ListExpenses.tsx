import {ExpenseRow} from "./ExpenseRow"
import style from "./ListExpenses.module.css"
import {useState} from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal} from "@mui/material";
import ExpenseForm from "../ExpenceForm";
import {ExpenseFormAction} from "../ExpenceForm/ExpenseForm";
import DeleteExpenseDialog from "../DeleteExpenseDialog";
import {Expense} from "../../services/expenses";


export default function ListExpenses(props){
    const {results, userCategories ,handleReload } = props

    /// State y handlers para los modals de las opciones
    const [showModifyExpense, setShowModifyExpense] = useState<boolean>(false)
    const [showDeleteExpense, setShowDeleteExpense] = useState<boolean>(false)

    /// State que contiene la Expense seleccionada
    const [expense, setExpense] = useState<Expense | undefined>()
    const handleClickModifyExpense = (_id) => {
        const currentExpense = results?.expenses?.find((e) => {return e._id === _id})
        setExpense({...currentExpense, date: currentExpense.date.slice(0,16) })
        setShowModifyExpense(true)
    }
    const handleClickDeleteExpense = (_id) => {
        setExpense(results?.expenses?.find((e) => {return e._id === _id}))
        setShowDeleteExpense(true)
    }

    const handleClose = () => {
        setExpense(undefined)
        setShowDeleteExpense(false)
        setShowModifyExpense(false)
    }

    function getCategory(id:string){
        return userCategories[userCategories.findIndex(category =>{
            return category._id === id
        })]
    }
    

    return (
        <div className={style.ListExpenses}>
            <div className={style.ListExpenses__list}>
                <ExpenseRow name="Name" date="Date" value="Value" category="Category"/>
                {results?.expenses?.map((expense)=> <ExpenseRow key={expense._id} _id={expense._id} name={expense.name} date={expense.date} value={expense.value} options={true} category={getCategory(expense.categoryID).name}  color={getCategory(expense.categoryID).color} handleModify={handleClickModifyExpense} handleDelete={handleClickDeleteExpense}/>)}
            </div>
            <Dialog open={showModifyExpense} aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description" onClose={handleClose}>
                <ExpenseForm action={ExpenseFormAction.modify} expense={expense} dismiss={handleClose} />
            </Dialog>
            <Dialog open={showDeleteExpense} aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description" onClose={handleClose}>
                <DeleteExpenseDialog expense={{expenseID:expense?._id}} handleClose={handleClose} />
            </Dialog>
        </div>
    )
}