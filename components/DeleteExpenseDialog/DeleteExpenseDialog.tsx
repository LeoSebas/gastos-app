import {useState} from "react";
import {DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import InputBox from "../InputBox";
import ActionButton from "../ActionButton";
import {deleteExpense, ExpenseDelete, ServerResponse} from "../../services/expenses";
import {useSelector} from "react-redux";
import {AppState} from "../../redux";

enum DeleteDialogStatus {
    pure,
    success,
    failure
}
interface DeleteDialogState {
    status: DeleteDialogStatus,
    serverResponse?: ServerResponse
}
export default function DeleteExpenseDialog({expense,handleClose}: { expense:ExpenseDelete, handleClose: () => void }) {
    const [deleteDialogState, setDeleteDialogState] = useState<DeleteDialogState>({status: DeleteDialogStatus.pure})
    const token = useSelector((state: AppState) => state.user.token)

    const handleDeleteExpense = async () => {
        const response = await deleteExpense(expense, token)
        setDeleteDialogState({
            status: response.data.error ? DeleteDialogStatus.failure : DeleteDialogStatus.success,
            serverResponse: response.data
        })
    }

    const DeleteDialogConfimation = () => {
        return <>

            <DialogContentText>
                ¿Esta seguro que desea borrar el gasto?
            </DialogContentText>
            <InputBox>
                <ActionButton type="button" onClick={handleDeleteExpense}><span>Si, borrar gastos</span></ActionButton>
                <ActionButton type="button" onClick={handleClose}><span>No, Regresar</span></ActionButton>
            </InputBox>

        </>
    }
    const DeleteDialogSuccess = () => {
        return <><DialogContentText>
            {deleteDialogState.serverResponse.msg}
        </DialogContentText>
            <InputBox>
                <ActionButton type="button" onClick={handleClose}><span>Regresar :)</span></ActionButton>
            </InputBox></>
    }
    const DeleteDialogFailure = () => {
        return <><DialogContentText>
            {deleteDialogState.serverResponse.msg}
        </DialogContentText>
            <InputBox>
                <ActionButton type="button" onClick={handleClose}><span>Regresar :(</span></ActionButton>
            </InputBox></>
    }

    return <>
        <DialogTitle>Borrar gasto</DialogTitle>
        <DialogContent>
            {deleteDialogState.status === DeleteDialogStatus.pure?
                <DeleteDialogConfimation/> : (deleteDialogState.status === DeleteDialogStatus.success ? <DeleteDialogSuccess/> :
                    <DeleteDialogFailure/>)
            }
        </DialogContent>
    </>
}