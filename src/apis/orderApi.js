//PUT请求：如果两个请求相同，后一个请求会把第一个请求覆盖掉。（所以PUT用来改资源）
//POST请求：后一个请求不会把第一个请求覆盖掉。（所以Post用来增加源）
import request from '../utils/request';

export function getOrderByUserAccount(pageSize, currentPage, account) {
    return request({
        method: 'GET',
        url: '/api/administration/getadministration',
        params: {
            account: id,
            password: password
        }
    })
}
export function getOrderByUserAccountCount(account) {
    return request({
        method: 'GET',
        url: '/api/HotelInstance/getallcount',
        params: {

        }
    })
}
//对接参数
export function deleteOrder(orderId) {
    return request({
        method: 'DELETE',
        url: '/api/HotelInstance/getallcount',
        params: {
            uu
        }
    })
}