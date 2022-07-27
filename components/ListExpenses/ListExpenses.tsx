import {Expense} from "./Expense"
import style from "./ListExpenses.module.css"
import {useState} from "react";
import {Modal} from "@mui/material";
import ExpenseForm from "../ExpenceForm";
import {ExpenseFormAction} from "../ExpenceForm/ExpenseForm";
import ActionButton from "../ActionButton";


export default function ListExpenses(props){
    const {results, userCategories} = props

    /// State y handlers para los modals de las opciones
    const [showModifyExpense, setShowModifyExpense] = useState<boolean>(false)
    const [showDeleteExpense, setShowDeleteExpense] = useState<boolean>(false)

    /// State que contiene la Expense seleccionada
    const [expense, setExpense] = useState()
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

    function getCategoryName(id:string){
        return userCategories[userCategories.findIndex(category =>{
            return category._id === id
        })].name
    }
    

    return (
        <div className={style.ListExpenses}>
            <div className={style.ListExpenses__list}>
                <Expense name="Name" date="Date" value="Value" category="Category"/>
                {results?.expenses?.map((expense)=> <Expense key={expense._id} _id={expense._id} name={expense.name} date={expense.date} value={expense.value} options={true} category={getCategoryName(expense.categoryID)} handleModify={handleClickModifyExpense} handleDelete={handleClickDeleteExpense}/>)}
            </div>
            <Modal open={showModifyExpense}   aria-labelledby="parent-modal-title"
                   aria-describedby="parent-modal-description" onClose={handleClose}>
                <section className="absolute h-screen w-full flex items-start justify-center overflow-scroll">
                    <ExpenseForm action={ExpenseFormAction.modify} expense={expense} dismiss={handleClose} />
                </section>
            </Modal>
            <Modal open={showDeleteExpense}   aria-labelledby="parent-modal-title"
                   aria-describedby="parent-modal-description" onClose={handleClose}>
                <section className="absolute h-screen w-full flex items-center justify-center ">
                    <ActionButton type="button" onClick={handleClose}><span>Regresar</span></ActionButton>
                </section>
            </Modal>
        </div>
    )
}