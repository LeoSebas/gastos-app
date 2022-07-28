import {LOCAL_API, HEROKU_API} from "./localAPI";
import {AxiosResponse} from "axios";
import { ResponseState } from "./auth";
import { AppState } from "../redux";

export interface ExpenseInput {
    "expenseName" : string,
    "expenseValue" : number,
    "expenseDate" : Date
    "categoryName" : string
}

export interface ExpenseModify {
    "expenseID": string,
    "newCategory": string,
    "newExpenseDate": Date |number,
    "newExpenseName": string,
    "newExpenseValue": number
}

export interface ExpenseDelete {
    "expenseID": string,
}

export interface Expense {
    "name":string,
    "value":number,
    "date": Date,
    "categoryID" : string,
    "_id": string
}

export interface ServerResponse {
    msg:string,
    error?: true
}

export function searchExpenses(token:string, queryParams:any) : Promise<AxiosResponse> {
    var {search,
        minValue,
        maxValue,
        minDate,
        maxDate,
        category,
        sortBy,
        itemsPerPage,
        page} = queryParams

    let config = {
        headers:{"Authorization": "Bearer " + token}
    }
    return HEROKU_API.get(`api/expenses/search?search=${search}&minValue=${minValue}&maxValue=${maxValue}&page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&desc=&minDate=${minDate}&maxDate=${maxDate}&categoryID=${category}`, config)
}

export function addExpense(expense : ExpenseInput, token: string) : Promise<AxiosResponse<ServerResponse>> {
    let config = {
        headers:{"Authorization": "Bearer " + token}
    }

    return HEROKU_API.post(`api/expenses`, expense, config)
}

export function modifyExpense(expense : ExpenseModify, token: string) : Promise<AxiosResponse<ServerResponse>>{
    let config = {
        headers:{"Authorization": "Bearer " + token}
    }

    return HEROKU_API.patch(`api/expenses`, expense, config)
}

export function deleteExpense(expendeID : ExpenseDelete, token: string) : Promise<AxiosResponse<ServerResponse>> {
    let config = {
        headers:{"Authorization": "Bearer " + token},
        data: expendeID
    }
    return HEROKU_API.delete(`api/expenses`, config)
}

export function getRecentAddedExpenses(token) : Promise<AxiosResponse<any>>{
    let config = {
        headers:{"Authorization": "Bearer " + token}
    }
    /// Limite por defecto para mostrar los ultimos gastos
    const limit = 10
    const page = 1
    return HEROKU_API.get(`api/expenses/search?limit=${limit}&page=${page}`, config)
}