import { useState } from "react";
import { useSelector} from "react-redux";
import ListExpenses from "../../../components/ListExpenses";
import { Pagination } from "../../../components/ListExpenses/Pagination";
import SearchBar from "../../../components/SearchBar";
import { AppState } from "../../../redux";
import style from "./search.module.css"
import {Dialog, Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpenseForm from "../../../components/ExpenceForm";
import {ExpenseFormAction} from "../../../components/ExpenceForm/ExpenseForm";
import CustomHead from "../../../components/CustomHead";



export default function Search (){
    const [results, setResults] = useState({totalItems:0, totalPages:0})
    const [page, setPage] = useState(1)
    const [error, setError] = useState('')
    const userCategories = useSelector((state: AppState) => state.categories)
    const [reload, setReload] = useState(false)

    const [showAddExpense, setShowAddSpence] = useState(false)

    const handleAddExpenseModal = () => {
        setShowAddSpence(true)
    }
    const handleClose = () => {
        setShowAddSpence(false);
    };



    return (
            <div className={style.Search}>
                <CustomHead title={"Ahorrar+ - Tus gastos"} />
                <SearchBar setResults={setResults} userCategories={userCategories} page={page} setPage={setPage} setError={setError} reload={reload}/>
                {(error)&& <p>{error}</p>}
                {   results?.totalPages!==0 && //La paginación no se muestra si no hay páginas. El backend devuelve el resultado de totalItems/limit redondeado hacia arriba. Por ahi es mejor que esto se haga en el frontend, por una cuestion de performance, pero dudo que afecte mucho.
                    <section className="w-11/12 lg:w-10/12 xl:w-10/12 2xl:w-8/12 flex flex-col items-center">

                        <ListExpenses results={results} userCategories={userCategories} setReload={setReload} reload={reload}/>
                        <div className="max-w-min">
                            <Pagination totalItems={results?.totalItems} totalPages={results?.totalPages} page={page} setPage={setPage}/>
                        </div>

                    </section>
                }
                <div className="w-full flex justify-end z-10 p-10">
                    <Fab color="primary" variant="extended" aria-label="add" onClick={handleAddExpenseModal}>
                        <AddIcon/> Agregar Gasto
                    </Fab>
                </div>
                <Dialog open={showAddExpense} aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description" onClose={handleClose}>
                    <ExpenseForm action={ExpenseFormAction.create} dismiss={handleClose} handleReload={() => {
                        setReload(!reload)
                    }}></ExpenseForm>
                </Dialog>
            </div>

    )
}