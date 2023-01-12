import axios from "axios"

const link = "/api/bookseva"
const baseUrl = axios.create({
    baseURL: link,
    headers: {
        "Contant-type": "application/json",
        "Accept": "application/json"
    }
});

export default baseUrl
