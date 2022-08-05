import axios from "axios";

const LOCAL_API = axios.create({
    baseURL: "http://localhost:4000",
    timeout: 5000
})

LOCAL_API.interceptors.request.use((config) => {
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

const HEROKU_API = axios.create({
    baseURL: "https://quiet-oasis-06107.herokuapp.com",
    timeout: 5000
})

HEROKU_API.interceptors.request.use((config) => {
  /*   config.headers.authorization = "Bearer" */
    return config
}, () => {

    }
)

HEROKU_API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return error.response;
    }
);

export {LOCAL_API, HEROKU_API}