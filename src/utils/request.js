import axios from "axios";
// import router from "../router";
// import { Message } from "element-ui";
const request = axios.create({
    //zzy
    // baseURL: 'http://10.21.144.44:8080',
    //fcc
    baseURL: 'http://10.16.41.156:8080',
    //tyf
    // baseURL: 'http://10.16.42.166:8080',
    timeout: 10000
})

//请求拦截器  在发请求前，进行统一的修改
request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) config.headers.Authoriztion = `${token}`
        return config
    },
    (error) => Promise.reject(error)
)

// //响应拦截器，判断token是否正确
// request.interceptors.response.use(
//     (response) => response,
//     ({ response }) => {
//         const { data } = response
//         const { message } = data
//         Message.error(message)
//         if (data.code == 502) router.push({ name: 'userLogin' })
//         return Promise.reject(error)
//     }
// )
export default request