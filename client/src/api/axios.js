import axios from "axios";
import store from "../app/store";
import { setToken } from "../feature/auth/state/authSlice";



const axioseInstance = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    headers: {
        'COntant-Type': "application/json",

    },
    timeout: 10000,
    withCredentials: true
});


axioseInstance.interceptors.request.use(
    (config) => {

        const state = store.getState();

        const token = state.auth.accessToken;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        };

        return config


    },
    (error) => Promise.reject(error)
)


axioseInstance.interceptors.response.use(

    (response) => response,

    async (error) => {

        const orignalRequest = error.config;

        if (error.response?.status === 401 && !orignalRequest._retry) {
            orignalRequest._retry = true;

            const response = await axioseInstance.post("/auth/refresh-token");


            const newToken = response.data.data.accessToken;

            store.dispatch(setToken(newToken));

            orignalRequest.headers.Authorization = `Bearer ${newToken}`;

            return axioseInstance(orignalRequest)
        };

        return Promise.reject(error)

    }
)

export default axioseInstance