import {ServerResponse} from "../../../services/expenses";
import {useState} from "react";
import {
    addCategory,
    Category,
    CategoryInput,
    CategoryModify, getCategories,
    modifyCategory
} from "../../../services/categories";
import {DialogContent, DialogContentText} from "@mui/material";
import InputBox from "../../InputBox";
import ActionButton from "../../ActionButton";
import {Form, Formik} from "formik";
import CustomField from "../../CustomField";
import {useDispatch, useSelector} from "react-redux";
import {appSlice, AppState} from "../../../redux";
import * as Yup from "yup";


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

        const CategorySchema = Yup.object().shape({
            categoryName: Yup.string().min(2, 'El nombre es muy corto').max(30, 'Creo que ya es muy largo, no?'),
            categoryColor: Yup.string(),
        })

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

        return <Formik initialValues={initialValues} onSubmit={ async (values) => {
            action === CategoryFormAction.create ? await handleAddCategory({
                categoryName: values.categoryName,
                categoryColor: values.categoryColor
            }) : await handleModifyCategory((category.name !== values.categoryName) ? {
                categoryName: category.name,
                newCategoryName: values.categoryName,
                newCategoryColor: values.categoryColor
            } : {categoryName: category.name, newCategoryColor: values.categoryColor    })
        }
        } validationSchema={CategorySchema}>
            {
                ({isSubmitting, values,errors , touched, handleChange}) => (
                    <Form className="flex flex-col">
                        <InputBox>
                            <label>Nombre de la categoria</label>
                            <CustomField id="categoryName" name="categoryName" value={values.categoryName}
                                         onChange={handleChange} type="text" required={true}/>
                            {errors.categoryName && touched.categoryName && <div className="text-red-400">{errors.categoryName}</div>}
                        </InputBox>
                        <InputBox >
                            <label>Color</label>
                            <CustomField className="w-full h-16" id="categoryColor" name="categoryColor" value={values.categoryColor}
                                         onChange={handleChange} type="color" required={true}/>
                            {errors.categoryColor && touched.categoryColor && <div className="text-red-400">{errors.categoryColor}</div>}
                        </InputBox>
                        <InputBox>
                            <ActionButton type="submit" className="bg-primary"
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
