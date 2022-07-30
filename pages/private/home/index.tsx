import {useDispatch, useSelector} from "react-redux";
import {appSlice, AppState} from "../../../redux";
import {useRouter} from "next/router";
import {getCategories} from "../../../services/categories";
import {useEffect, useState} from "react";
import ExpenseForm from "../../../components/ExpenceForm";
import {ExpenseFormAction} from "../../../components/ExpenceForm/ExpenseForm";
import {Fab, Modal, Box, Dialog} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ListExpenses from "../../../components/ListExpenses";
import {AxiosResponse} from "axios";
import {getRecentAddedExpenses} from "../../../services/expenses";


export default function Home() {
    /// Selector para consultar el user
    const currentUser = useSelector((state: AppState) => state.user)
    const dispatch = useDispatch()
    const router = useRouter()


    const [showAddExpense, setShowAddSpence] = useState(false)

    useEffect(() => {
        const categories = async () => {
            const response = await getCategories(currentUser.token)
            if (!response || response?.data.error) {
                console.log(response?.data?.msg)
            } else {
                dispatch(appSlice.actions.setCategories(response.data.categories))
            }
        }
        const getRecentAddedExpensesList = async () => {
            const response = await getRecentAddedExpenses(currentUser.token)
            setRecentAddedExpenses(response?.data)
        }

        categories()
        getRecentAddedExpensesList()

    }, [currentUser])

    const currentCategories = useSelector((state: AppState) => state.categories)
    const [recentAddedExpenses, setRecentAddedExpenses] = useState<AxiosResponse | undefined>(undefined)

    if (!currentUser) {
        router.push('/login')
        return <></>
    }
    const handleAddExpenseModal = () => {
        setShowAddSpence(true)
    }
    const handleClose = () => {
        setShowAddSpence(false);
    };

    return (
        <div className="flex flex-col items-center">
            <main className="container p-4 flex flex-1 flex-col items-center justify-center">
                <section className="">
                    <p>Pagina de inicio</p>
                    <section>
                        <ListExpenses results={recentAddedExpenses} userCategories={currentCategories}></ListExpenses>
                    </section>
                    <div className="w-full flex justify-end">
                            
                        <Fab color="primary" variant="extended" aria-label="add" onClick={handleAddExpenseModal}>
                            <AddIcon/> Agregar Gasto
                        </Fab>


                    </div>
                    <Dialog open={showAddExpense} aria-labelledby="parent-modal-title"
                            aria-describedby="parent-modal-description" onClose={handleClose}>
                        <ExpenseForm action={ExpenseFormAction.create} dismiss={handleClose}></ExpenseForm>
                    </Dialog>

                </section>
            </main>
        </div>
    )
}

