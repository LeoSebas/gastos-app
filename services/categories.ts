import {LOCAL_API, HEROKU_API} from "./localAPI";
import {AxiosResponse} from "axios";
import { ResponseState } from "./auth";
import { AppState } from "../redux";

export interface Category {
    "name": string,
    "color":string,
    "_id": string
}

export interface CategoryInput {
    categoryName: string,
    categoryColor:string
}

export interface CategoryModify {
    "categoryName": string,
    "newCategoryName"?: string,
    "newCategoryColor"?: string
}

export interface  CategoryDelete {
    categoryName: string
}

export function getCategories(token: string) : Promise<AxiosResponse> {
    let config = {
        headers:{"Authorization": "Bearer " + token}
    }
    return HEROKU_API.get('api/categories', config)
}

export function addCategory(category : CategoryInput, token: string) : Promise<AxiosResponse> {
    let config = {
        headers:{"Authorization": "Bearer " + token}
    }
    return HEROKU_API.post(`api/categories`, category, config)
}

export function modifyCategory(category : CategoryModify, token: string) : Promise<AxiosResponse> {
    let config = {
        headers:{"Authorization": "Bearer " + token}
    }
    return HEROKU_API.patch(`api/categories`, category, config)
}

export function deleteCategory(category : CategoryDelete, token:string) : Promise<AxiosResponse> {
    let config = {
        headers:{"Authorization": "Bearer " + token},
        data: category
    }

    return HEROKU_API.delete(`api/categories`, config)
}

