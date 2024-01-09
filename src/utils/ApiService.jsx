import axios from 'axios'
const API_URL = "https://6597ab3c668d248edf23285b.mockapi.io"

const ApiService = axios.create({
    baseURL : API_URL,
    headers : {
        "Content-Type" : "application/json"
    }
})

export default ApiService