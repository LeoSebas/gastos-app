import CategoryItem from "../CategoryItem/CategoryItem"
import style from "./ListCategories.module.css"
import {Category} from "../../../services/categories";
import {useState} from "react";
import {Dialog} from "@mui/material";
import CategoryForm from "../CategoryForm";
import {CategoryFormAction} from "../CategoryForm/CategoryForm";
import CategoryDeleteForm from "../CategoryDeleteForm";


export default function ListCategories(props) {
    const {userCategories} = props

    /// State para la categoria seleccionada
    interface CategoryDialogState {
        action?: CategoryFormAction
        categoryId?: string
    }

    const [categorySelected, setCategorySelected] = useState<Category | undefined>(undefined)
    const [showCategoryDialog, setShowCategoryDialog] = useState<CategoryDialogState>({})
    const [showModifyDialog , setShowModifyDialog] = useState(false)
    const [showDeleteDialog , setShowDeleteDialog] = useState(false)

    const handleCloseDialog = () => {
        setShowDeleteDialog(false)
        setShowModifyDialog(false)
        setCategorySelected(undefined)
        setShowCategoryDialog({})
    }
    const handleShowModify = (action: CategoryFormAction, _id:string) => {
        setCategorySelected(userCategories.find((category) => {
            return category._id === _id
        }))
        setShowCategoryDialog({action: action})
        setShowModifyDialog(true)
    }
    const handleShowDelete = (action: CategoryFormAction, _id:string) => {
        setCategorySelected(userCategories.find((category) => {
            return category._id === _id
        }))
        setShowCategoryDialog({action: action})
        setShowDeleteDialog(true)
    }

    return (<section>
            <div className={style.ListCategories}>
                {userCategories?.map((category) => <CategoryItem key={category._id} categoryID={category._id}
                                                                 name={category.name} color={category.color}
                                                                 options={true} handleModify={handleShowModify} handleDelete={handleShowDelete}/>)}
            </div>
            <Dialog open={showModifyDialog} aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description" onClose={handleCloseDialog}>
                <CategoryForm action={showCategoryDialog.action} handleClose={handleCloseDialog} category={categorySelected}/>
            </Dialog>
            <Dialog open={showDeleteDialog} aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description" onClose={handleCloseDialog}>
                <CategoryDeleteForm handleClose={handleCloseDialog} category={categorySelected}></CategoryDeleteForm>
            </Dialog>
        </section>
    )
}