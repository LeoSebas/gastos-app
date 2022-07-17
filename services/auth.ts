import {LOCAL_API} from "./localAPI";

export function register(user) {
    return LOCAL_API.post('api/user', user)
}

export function confirmToken(token) {
    return LOCAL_API.get(`api/user/confirmed/${token}`)
}