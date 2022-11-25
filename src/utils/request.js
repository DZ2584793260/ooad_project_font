import axios from "axios";
const request = axios.create({
    // baseURL: 'http://10.16.38.64:8080',
    baseURL: 'http://10.16.41.156:8080',
    // timeout: 5000
})
export default request