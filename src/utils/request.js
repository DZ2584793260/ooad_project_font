import axios from "axios";
import router from "../router";
import { Message } from "element-ui";
const request = axios.create({
    //zyy
    baseURL: 'http://10.16.38.64:8080',
    //fcc
    // baseURL: 'http://10.16.41.156:8080',
    timeout: 5000
})

//请求拦截器  在发请求前，进行统一的修改
request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) config.headers.Authoriztion = `Bearer ${token}`
        return config
    },
    (error) => Promise.reject(error)
)
//响应拦截器，判断token是否正确
request.interceptors.response.use(
    (response) => response,
    ({ response }) => {
        const { status, data } = response
        const { message } = data
        Message.error(message)
        if (status == 401) router.push({ name: 'userLogin' })
        return Promise.reject(error)
    }
)
export default request