import {ServerResponse} from "../../../services/expenses";
import {useState} from "react";
import {
    addCategory,
    Category,
    CategoryInput,
    CategoryModify,
    deleteCategory, getCategories,
    modifyCategory
} from "../../../services/categories";
import {DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import InputBox from "../../InputBox";
import ActionButton from "../../ActionButton";
import {Form, Formik} from "formik";
import CustomField from "../../CustomField";
import {useDispatch, useSelector} from "react-redux";
import {appSlice, AppState} from "../../../redux";


enum CategoryFormStatus {
    pure,
    success,
    failure,
}

interface CategoryFormState {
    status: CategoryFormStatus,
    serverResponse?: ServerResponse
}

export enum CategoryFormAction {
    create,
    modify,
    delete
}

const CategoryActionText = {
    0: {title: "Agregar una nueva categoria", actionButton: "Agregar categoria"},
    1: {title: "Editar una categoria", actionButton: "Editar categoria"},
}

export default function CategoryForm({
                                         action,
                                         category,
                                         handleClose
                                     }: { action: CategoryFormAction, category?: Category, handleClose: () => void }) {
    /// State del formulario
    const [categoryFormState, setCategoryFormState] = useState<CategoryFormState>({status: CategoryFormStatus.pure})
    const currentUser = useSelector((state: AppState) => state.user)
    const dispatch = useDispatch()


    const CategoryFormInput = () => {

        const initialValues: CategoryInput = {
            categoryName: category ? category.name : '',
            categoryColor: category ? category.color : '',
        }

        const handleAddCategory = async (category: CategoryInput) => {
            const response = await addCategory(category, currentUser.token)
            setCategoryFormState({
                status: response.data.error ? CategoryFormStatus.failure : CategoryFormStatus.success,
                serverResponse: response.data
            })
            const updatedCategories = await getCategories(currentUser.token)
            dispatch(appSlice.actions.setCategories(updatedCategories.data.categories))
        }

        const handleModifyCategory = async (category: CategoryModify) => {
            const response = await modifyCategory(category, currentUser.token)
            setCategoryFormState({
                status: response.data.error ? CategoryFormStatus.failure : CategoryFormStatus.success,
                serverResponse: response.data
            })
            const updatedCategories = await getCategories(currentUser.token)
            dispatch(appSlice.actions.setCategories(updatedCategories.data.categories))
        }

        return <Formik initialValues={initialValues} onSubmit={(values, formikHelpers) => {
            action === CategoryFormAction.create ? handleAddCategory({
                categoryName: values.categoryName,
                categoryColor: values.categoryColor
            }) : handleModifyCategory((category.name !== values.categoryName) ? {
                categoryName: category.name,
                newCategoryName: values.categoryName,
                newCategoryColor: values.categoryColor
            } : {categoryName: category.name, newCategoryColor: values.categoryColor    })
        }}>
            {
                ({isSubmitting, values, handleChange}) => (
                    <Form className="flex flex-col">
                        <InputBox>
                            <label>Nombre de la categoria</label>
                            <CustomField id="categoryName" name="categoryName" value={values.categoryName}
                                         onChange={handleChange} type="text" required={true}/>
                        </InputBox>
                        <InputBox>
                            <label>Color</label>
                            <CustomField id="categoryColor" name="categoryColor" value={values.categoryColor}
                                         onChange={handleChange} type="color" required={true}/>
                        </InputBox>
                        <InputBox>
                            <ActionButton type="submit"
                                          disabled={isSubmitting}><span>{CategoryActionText[action]?.actionButton}</span></ActionButton>
                            <ActionButton type="button" onClick={handleClose}><span>Regresar</span></ActionButton>
                        </InputBox>
                    </Form>
                )
            }
        </Formik>
    }

    const CategoryFormSuccess = () => {
        const handleCloseForm = () => {
            handleClose()
        }
        return <DialogContent>
            <DialogContentText>
                {categoryFormState.serverResponse.msg}
            </DialogContentText>
            <InputBox>
                {action === CategoryFormAction.create
                    ? <ActionButton type="button" onClick={() => {
                        setCategoryFormState({status: CategoryFormStatus.pure})
                    }}><span>Agregar otra categoria</span></ActionButton>
                    : <></>
                }
                <ActionButton type="button" onClick={handleCloseForm}>Regresar</ActionButton>
            </InputBox>
        </DialogContent>
    }

    const CategoryFormFailure = () => {
        return <DialogContent>
            <DialogContentText>
                {categoryFormState.serverResponse.msg}
            </DialogContentText>
            <InputBox>
                <ActionButton type="button" onClick={handleClose}>Regresar</ActionButton>
            </InputBox>
        </DialogContent>
    }

    return <div className="bg-white rounded-3xl max-h-min max-w-min p-3">
        {(categoryFormState.status === CategoryFormStatus.pure)
            ? (<DialogContent>
                    <CategoryFormInput/>
                </DialogContent>
            )
            : (categoryFormState.status === CategoryFormStatus.success
                    ? <CategoryFormSuccess/>
                    : <CategoryFormFailure/>
            )
        }
    </div>
}
