import {LOCAL_API, HEROKU_API} from "./localAPI";
import {AxiosResponse} from "axios";
import { ResponseState } from "./auth";
import { AppState } from "../redux";



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
