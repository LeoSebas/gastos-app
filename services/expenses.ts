import {LOCAL_API, HEROKU_API} from "./localAPI";
import {AxiosResponse} from "axios";
import { ResponseState } from "./auth";
import { AppState } from "../redux";

export interface ExpenseInput {
    "expenseName" : string,
    "expenseValue" : number,
    "expenseDate" : Date,
    "categoryName" : string
}

export interface ExpenseModify {
    "expenseID": string,
    "newCategory": string,
    "newExpenseDate": Date,
    "newExpenseName": string,
    "newExpenseValue": number
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

    return HEROKU_API.post(`api/expenses`, expense,config)
}

export function modifyExpense(expense : ExpenseModify, token: string) : Promise<AxiosResponse<ServerResponse>>{
    let config = {
        headers:{"Authorization": "Bearer " + token}
    }

    return HEROKU_API.patch(`api/expenses`, expense, config)
}