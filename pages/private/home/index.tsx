import {useDispatch, useSelector} from "react-redux";
import {appSlice, AppState} from "../../../redux";
import {useRouter} from "next/router";
import {getCategories} from "../../../services/categories";
import {useEffect, useState} from "react";
import ExpenseForm from "../../../components/ExpenceForm";
import {ExpenseFormAction} from "../../../components/ExpenceForm/ExpenseForm";
import {Fab, Dialog} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ListExpenses from "../../../components/ListExpenses";
import {searchExpenses, ServerResponse} from "../../../services/expenses";
import PieChart from "../../../components/Charts/PieChart/PieChart";
import BarChart from "../../../components/Charts/BarChart/BarChart";
import style from "./Home.module.css"


export default function Home() {
    /// Selector para consultar el user
    const {user} = useSelector((state: AppState) => state)
    const currentCategories = useSelector((state: AppState) => state.categories)
    const [recentAddedExpenses, setRecentAddedExpenses] = useState<ServerResponse | undefined>(undefined)
    const [showAddExpense, setShowAddSpence] = useState(false)
    const [reload, setReload] = useState(false)
    const router = useRouter()


    useEffect(() => {
        const getRecentAddedExpensesList = async () => {
            const response = await searchExpenses(user.token, {
                search: '',
                minValue: '',
                maxValue: '',
                minDate: '',
                maxDate: '',
                category: '',
                page: 1,
                itemsPerPage: 10,
                sortBy: "date",
                desc: -1
            })
            setRecentAddedExpenses(response?.data)
        }
        getRecentAddedExpensesList()
    }, [reload, user.token])




    const handleAddExpenseModal = () => {
        setShowAddSpence(true)
    }
    const handleClose = () => {
        setShowAddSpence(false);
    };

    if (!user) {
        router.push('/login')
        return <></>
    }
 
    return (
        <div className="flex flex-col items-center -z-10">
            <main className="container p-4 flex flex-1 flex-col items-center justify-center">
                <section className={style.Home__main} >
                    <p className={style.Home__title}>Pagina de inicio</p>
                    <div className={style.Home__charts}>
                        <PieChart token={user.token} currentCategories={currentCategories} reload={reload}/>
                        <BarChart token={user.token} reload={reload}/>
                    </div>
                    <section className="w-full">
                        <h1>Gastos recientes: </h1>

                        {(recentAddedExpenses?.error)
                            ? <p className="w-full text-center p-3">{recentAddedExpenses.msg}</p>
                            : <ListExpenses results={recentAddedExpenses} userCategories={currentCategories}
                                            setReload={setReload} reload={reload}></ListExpenses>
                        }

                    </section>
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

                </section>
            </main>
        </div>
    )
}

