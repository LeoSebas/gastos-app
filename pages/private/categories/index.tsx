import {useSelector} from "react-redux"
import ListCategories from "../../../components/Categories/ListCategories/ListCategories"
import {AppState} from "../../../redux"
import style from "./categories.module.css"
import {Dialog, Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useState} from "react";
import CategoryForm from "../../../components/Categories/CategoryForm";
import {CategoryFormAction} from "../../../components/Categories/CategoryForm/CategoryForm";


export default function Categories (){

    const userCategories = useSelector((state: AppState) => state.categories)
    const [showAddCategoryDialog, setShowAddCategoryDialog] = useState<boolean>(false)
    const handleAddCategory = () => {
        setShowAddCategoryDialog(true)
    }
    const handleCloseDialog =  () => {
        setShowAddCategoryDialog(false)
    }


    return (
        <div className={style.Categories}>

            <h2 className={style.Categories__title}>Categorias</h2>
            <ListCategories userCategories={userCategories}/>

            <div className="w-full flex justify-end ">
                <Fab color="primary" variant="extended" aria-label="add" onClick={handleAddCategory}>
                    <AddIcon/> Agregar categoria
                </Fab>
            </div>
            <Dialog open={showAddCategoryDialog} aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description" onClose={handleCloseDialog}>
                <CategoryForm action={CategoryFormAction.create} handleClose={handleCloseDialog}/>
            </Dialog>
        </div>
    )

}