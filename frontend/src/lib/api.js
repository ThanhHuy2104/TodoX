import axios from "axios";

const baseURL = import.meta.env.MODE === 'development' ? "http://localhost:3000/api" : "/api"
const api = axios.create({
    baseURL: baseURL
})

export default api