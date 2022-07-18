import {LOCAL_API} from "./localAPI";
import {AxiosResponse} from "axios";

interface ResponseState {
    msg: string,
    error: boolean
}

export function register(user) : Promise<AxiosResponse<ResponseState>> {
    return LOCAL_API.post('api/user', user)
}

export function confirmToken(token) {
    return LOCAL_API.get(`api/user/confirmed/${token}`)
}