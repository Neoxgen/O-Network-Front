import axios from "axios"


export const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_ORIGIN}/api`,
    withCredentials: true
})
