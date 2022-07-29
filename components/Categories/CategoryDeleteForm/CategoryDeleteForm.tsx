import {Category, deleteCategory} from "../../../services/categories";
import {DialogContent, DialogContentText} from "@mui/material";
import InputBox from "../../InputBox";
import ActionButton from "../../ActionButton";
import {CategoryFormAction} from "../CategoryForm/CategoryForm";
import {ServerResponse} from "../../../services/expenses";
import {useState} from "react";
import {useSelector} from "react-redux";
import {AppState} from "../../../redux";

enum CategoryDeleteStatus {
    pure,
    success,
    failure,
}

interface CategoryDeleteState {
    status: CategoryDeleteStatus,
    serverResponse?: ServerResponse
}

export default function CategoryDeleteForm({category, handleClose} : {category: Category,handleClose: () => void}) {
    const [categoryDeleteState, setCategoryDeleteState] = useState<CategoryDeleteState>({status: CategoryDeleteStatus.pure})
    const currentUser = useSelector((state: AppState) => state.user)

    const CategoryFormSuccess = () => {
        const handleCloseForm = () => {
            handleClose()
        }
        return <DialogContent>
            <DialogContentText>
                {categoryDeleteState.serverResponse.msg}
            </DialogContentText>
            <InputBox>

                <ActionButton type="button" onClick={handleCloseForm}>Regresar</ActionButton>
            </InputBox>
        </DialogContent>
    }

    const CategoryFormFailure = () => {
        return <DialogContent>
            <DialogContentText>
                {categoryDeleteState.serverResponse.msg}
            </DialogContentText>
            <InputBox>
                <ActionButton type="button" onClick={handleClose}>Regresar</ActionButton>
            </InputBox>
        </DialogContent>
    }
    const DeleteForm = () => {

        const handleDeleteCategory = async () => {
            const response = await deleteCategory({categoryName: category.name}, currentUser.token)
            setCategoryDeleteState({
                status: response.data.error ? CategoryDeleteStatus.failure : CategoryDeleteStatus.success,
                serverResponse: response.data
            })
        }

        return <><DialogContentText>
            {`¿Esta seguro que desea borrar la categoria?`}
        </DialogContentText>
            <InputBox>
                <ActionButton type="button"
                              onClick={handleDeleteCategory}><span>Sí, borrar categoria</span></ActionButton>
                <ActionButton type="button" onClick={() => {
                    handleClose()
                }}><span>No, regresar</span></ActionButton>
            </InputBox>
        </>
    }

    return <div className="bg-white rounded-3xl max-h-min max-w-min p-3">
        {(categoryDeleteState.status === CategoryDeleteStatus.pure)
            ? (<DialogContent>
                    <DeleteForm />
                </DialogContent>
            )
            : (categoryDeleteState.status === CategoryDeleteStatus.success
                    ? <CategoryFormSuccess/>
                    : <CategoryFormFailure/>
            )
        }
    </div>
}