import { AxiosResponse } from "axios"
import { HEROKU_API } from "./localAPI"




export function getProfile(token: string) : Promise<AxiosResponse> {
    let config = {
        headers:{"Authorization": "Bearer " + token}
    }
    return HEROKU_API.get('api/user/profile', config)
}
