import axios from "axios";

const LOCAL_API = axios.create({
    baseURL: "http://localhost:4000",
    timeout: 5000
})

LOCAL_API.interceptors.request.use((config) => {
    config.headers = {...config.headers, "user-auth": "token"}
    return config
}, () => {

    }
)

LOCAL_API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return error.response;
    }
);

export {LOCAL_API}