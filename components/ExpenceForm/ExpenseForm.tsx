
import {AppState} from "../../redux";
import {
    addExpense,
    Expense,
    ExpenseInput,
    ExpenseModify,
    modifyExpense,
    ServerResponse
} from "../../services/expenses";
import {Form, Formik} from "formik";
import InputBox from "../InputBox";
import CustomField from "../CustomField";
import {useState} from "react";
import ActionButton from "../ActionButton";
import {DialogContent, DialogTitle} from "@mui/material";
import {useSelector} from "react-redux";
import {Done} from "@mui/icons-material";

export enum ExpenseFormAction {
    create,
    modify
}

const ActionTitles = {
    0: {title: 'Agregar un nuevo gasto', actionButton: 'Agregar gasto'},
    1: {title: 'Editar un gasto', actionButton: 'Modificar'},
}

enum FormStates {
    pure,
    success,
    failure
}


export default function ExpenseForm({
                                        action,
                                        expense,
                                        dismiss,
                                        handleReload,
                                    }: { action: ExpenseFormAction, expense?: Expense, dismiss: () => void , handleReload: ()=>void}) {

    interface FormState {
        status: FormStates,
        serverResponse?: ServerResponse
    }

    /// State del formulario
    const [formState, setFormState] = useState<FormState>({status: FormStates.pure})

    const categories = useSelector((state: AppState) => state.categories)

    const {user} = useSelector((state: AppState) => state)

    ///Setear valores iniciales del form para edicion
    const initialValues: ExpenseInput = {
        categoryName: expense ? categories.find((value) => value._id === expense.categoryID).name : categories[0].name,
        expenseDate: expense ? expense.date : new Date(),
        expenseName: expense ? expense.name : '',
        expenseValue: expense ? expense.value : 0
    }

    const ExpenseSuccess = () => {

        const handleResetForm = () => {
            setFormState({status: FormStates.pure})
        }

        const handleDismiss = () => {
            dismiss()
        }

        return <div className="flex flex-col justify-center">
            <h2 className="p-3 whitespace-nowrap rounded-xl border border-green-500"><Done color="success" />  {formState.serverResponse.msg}</h2>
            {action === ExpenseFormAction.create ? <>
                    <ActionButton type="button" onClick={handleResetForm} className="whitespace-nowrap">Agregar otro gasto</ActionButton>
                    <ActionButton type="button" onClick={handleDismiss}>Regresar</ActionButton>
                </>
                : <>
                    <ActionButton type="button" onClick={handleDismiss}>Regresar</ActionButton>
                </>}
        </div>
    }

    const ExpenseFailure = () => {
        const handleDismiss = () => {
            dismiss()
        }

        return <div>
            <h2>Ups... Ocurrió un error :(</h2>
            <p>{formState.serverResponse.msg}</p>
            <ActionButton type="button" onClick={handleDismiss}>Regresar</ActionButton>
        </div>
    }

    const submitExpenseInput = async (expense: ExpenseInput) => {
        const serverResponse = await addExpense(expense, user.token)
        setFormState({
            status: serverResponse.data.error ? FormStates.failure : FormStates.success,
            serverResponse: serverResponse.data
        })
        handleReload()
    }
    const submitExpenseModify = async (expense: ExpenseModify) => {
        const serverResponse = await modifyExpense(expense, user.token)
        setFormState({
            status: serverResponse.data.error ? FormStates.failure : FormStates.success,
            serverResponse: serverResponse.data
        })
        handleReload()
    }

    const ExpenseFormInput = () => {
        return <div className="">
            <DialogTitle>{ActionTitles[action].title}</DialogTitle>
            <DialogContent>
                <Formik initialValues={initialValues}
                        onSubmit={(values) => {
                            action === ExpenseFormAction.create ? submitExpenseInput({
                                categoryName: values.categoryName,
                                expenseName: values.expenseName,
                                expenseValue: values.expenseValue,
                                expenseDate: values.expenseDate,
                            }) : submitExpenseModify({
                                newExpenseDate: values.expenseDate,
                                newExpenseValue: values.expenseValue,
                                newExpenseName: values.expenseName,
                                expenseID: expense._id,
                                newCategory: values.categoryName
                            })

                        }}>
                    {
                        ({isSubmitting, values, handleChange}) => (
                            <Form className="flex flex-col">
                                <InputBox>
                                    <label htmlFor="expenseNameInput">Descripción del gasto:</label>
                                    <CustomField id={"expenseNameInput"} name="expenseName" value={values.expenseName}
                                                 onChange={handleChange} type="text" required={true}/>
                                </InputBox>
                                <InputBox>
                                    <label htmlFor="expenseNameValue">Importe:</label>
                                    <CustomField id={"expenseNameInput"} name="expenseValue"
                                                 value={values.expenseValue} onChange={handleChange}
                                                 type="number" required={true}/>
                                </InputBox>
                                <InputBox>
                                    <label>¿Cuándo hisiste el gasto?</label>
                                    <CustomField id={"expenseDateInput"}
                                                 name="expenseDate"
                                                 value={values.expenseDate}
                                                 onChange={handleChange}
                                                 type="datetime-local" required={true}/>
                                </InputBox>

                                <InputBox>
                                    <label htmlFor="expenseCategoryInput">Categoria</label>
                                    <CustomField id="expenseCategoryInput" name="categoryName" value={values.categoryName}
                                                 onChange={handleChange} component="select">
                                        {categories?.map((category, index) => {
                                            return <option value={category.name} key={index}>{category.name}</option>
                                        })
                                        }
                                    </CustomField>
                                </InputBox>
                                <InputBox>
                                    <ActionButton className="bg-primary" type="submit"
                                                  disabled={isSubmitting}><span>{ActionTitles[action].actionButton}</span></ActionButton>
                                    <ActionButton type="button" disabled={isSubmitting}
                                                  onClick={dismiss}><span>Cerrar</span></ActionButton>
                                </InputBox>

                            </Form>
                        )
                    }
                </Formik>
            </DialogContent>

        </div>
    }

    return <div className="bg-white rounded-3xl max-h-min max-w-min p-3">
        {(formState.status === FormStates.pure ? <ExpenseFormInput/> : (formState.status === FormStates.success ?
            <ExpenseSuccess/> : <ExpenseFailure/>))}
    </div>
}