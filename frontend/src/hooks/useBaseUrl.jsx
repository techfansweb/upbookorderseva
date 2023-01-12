import axios from "axios"

const link = "http://localhost:5000/api/bookseva"
const baseUrl = axios.create({
    baseURL: link,
    headers: {
        "Contant-type": "application/json",
        "Accept": "application/json"
    }
});

export default baseUrl
