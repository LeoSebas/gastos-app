import {LOCAL_API, HEROKU_API} from "./localAPI";
import {AxiosResponse} from "axios";
import { ResponseState } from "./auth";
import { AppState } from "../redux";



export function getCategories(token) : Promise<AxiosResponse> {
    let config = {
        headers:{"Authorization": "Bearer " + token}
    }
    return HEROKU_API.get('api/categories', config)
}



