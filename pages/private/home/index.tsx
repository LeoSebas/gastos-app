import {useDispatch, useSelector} from "react-redux";
import {appSlice, AppState} from "../../../redux";
import {useRouter} from "next/router";
import {getCategories} from "../../../services/categories";
import {useEffect, useState} from "react";
import ExpenseForm from "../../../components/ExpenceForm";
import {ExpenseFormAction} from "../../../components/ExpenceForm/ExpenseForm";
import {Fab, Modal, Box} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


export default function Home() {
    /// Selector para consultar el user
    const currentUser = useSelector((state: AppState) => state.user)
    const dispatch = useDispatch()
    const router = useRouter()
    const categories = async () => {
        const response = await getCategories(currentUser.token)
        console.log(response)
        if( !response || response?.data.error) {
            console.log(response?.data?.msg)
        } else {
            dispatch(appSlice.actions.setCategories(response.data.categories))
        }
    }

    const [showAddExpense, setShowAddSpence] = useState(false)
    
    useEffect(() => {
        categories()
      }, [])


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
                    <section>
                        <p>Pagina de inicio</p>

                        <Fab color="primary" variant="extended" aria-label="add" onClick={handleAddExpenseModal}>
                            <AddIcon /> Agregar Gasto
                        </Fab>
                        <Modal open={showAddExpense}   aria-labelledby="parent-modal-title"
                               aria-describedby="parent-modal-description" onClose={handleClose}>
                            <section className="absolute h-screen w-full flex items-center justify-center ">
                                <ExpenseForm action={ExpenseFormAction.create} dismiss={handleClose}></ExpenseForm>
                            </section>
                        </Modal>
                    </section>
                </main>
            </div>
    )
}

