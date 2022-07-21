import {LOCAL_API, HEROKU_API} from "./localAPI";
import {AxiosResponse} from "axios";

export interface ResponseState {
    msg: string,
    error: boolean
}

export interface ResponseLogin {
    _id: string
    name: string
    email: string
    token: string
}

interface Credentials {
    email: string,
    password: string
}

export function register(user) : Promise<AxiosResponse<ResponseState>> {
    return HEROKU_API.post('api/user', user)
}

export function confirmToken(token) {
    return HEROKU_API.get(`api/user/confirmed/${token}`)
}

export function loginUser(credentials: Credentials) : Promise<AxiosResponse<ResponseState | ResponseLogin>> {
    return HEROKU_API.post('api/user/login', credentials)
}