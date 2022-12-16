//PUT请求：如果两个请求相同，后一个请求会把第一个请求覆盖掉。（所以PUT用来改资源）
//POST请求：后一个请求不会把第一个请求覆盖掉。（所以Post用来增加源）
import request from '../utils/request';
//用户
//查询
export function getOrderConditionCount(account, orderId, keyword, type) {
    return request({
        method: 'GET',
        url: '/api/Order/GetOrdersNumByCondition',
        params: {
            account: account,
            uuid: orderId,
            hotelNameAddress: keyword,
            key: type
        }
    })
}

export function getOrderConditional(pageSize, currentPage, account, orderId, keyword, type) {
    return request({
        method: 'GET',
        url: '/api/Order/GetOrdersByCondition',
        params: {
            pagesize: pageSize,
            currentpage: currentPage,
            account: account,
            uuid: orderId,
            hotelNameAddress: keyword,
            key: type
        }
    })
}

//全部订单
export function getOrderByUserAccountCount(account) {
    return request({
        method: 'GET',
        url: '/api/Order/GetOrdersNumByUserAccount',
        params: {
            account: account
        }
    })
}
export function getOrderByUserAccount(pageSize, currentPage, account) {
    return request({
        method: 'GET',
        url: '/api/Order/GetOrdersByUserAccount',
        params: {
            pageSize: pageSize,
            currentPage: currentPage,
            account: account
        }
    })
}



//未完成订单
export function GetUnfinishedOrdersNumByUserAccount(account) {
    return request({
        method: 'GET',
        url: '/api/Order/GetUnfinishedOrdersNumByUserAccount',
        params: {
            account: account
        }
    })
}
export function GetUnfinishedOrdersByUserAccount(pageSize, currentPage, account) {
    return request({
        method: 'GET',
        url: '/api/Order/GetUnfinishedOrdersByUserAccount',
        params: {
            pageSize: pageSize,
            currentPage: currentPage,
            account: account
        }
    })
}



//待评价订单
export function GetUnevaluatedOrdersNumByUserAccount(account) {
    return request({
        method: 'GET',
        url: '/api/Order/GetUnevaluatedOrdersNumByUserAccount',
        params: {
            account: account
        }
    })
}
export function GetUnevaluatedOrdersByUserAccount(pageSize, currentPage, account) {
    return request({
        method: 'GET',
        url: '/api/Order/GetUnevaluatedOrdersByUserAccount',
        params: {
            pageSize: pageSize,
            currentPage: currentPage,
            account: account
        }
    })
}


//已评价订单
export function GetEvaluatedOrdersNumByUserAccount(account) {
    return request({
        method: 'GET',
        url: '/api/Order/GetEvaluatedOrdersNumByUserAccount',
        params: {
            account: account
        }
    })
}
export function GetEvaluatedOrdersByUserAccount(pageSize, currentPage, account) {
    return request({
        method: 'GET',
        url: '/api/Order/GetEvaluatedOrdersByUserAccount',
        params: {
            pageSize: pageSize,
            currentPage: currentPage,
            account: account
        }
    })
}

//管理员

//查询 各个页面需要修改
export function GetOrdersByConditionNum(orderId, keyword, type) {
    return request({
        method: 'GET',
        url: '/api/Order/GetOrdersByConditionNum',
        params: {
            uuid: orderId,
            hotelNameAddress: keyword,
            key: type
        }
    })
}

export function GetOrdersByCondition(pageSize, currentPage, orderId, keyword, type) {
    return request({
        method: 'GET',
        url: '/api/Order/GetOrdersByCondition',
        params: {
            pagesize: pageSize,
            currentpage: currentPage,
            uuid: orderId,
            hotelNameAddress: keyword,
            key: type
        }
    })
}
//全部订单
export function GetAllOrdersNum() {
    return request({
        method: 'GET',
        url: '/api/Order/GetAllOrdersNum',
        params: {
            account: account
        }
    })
}
export function GetAllOrders(pageSize, currentPage) {
    return request({
        method: 'GET',
        url: '/api/Order/GetAllOrders',
        params: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })
}

//未完成订单
export function GetAllUnfinishedOrdersNum() {
    return request({
        method: 'GET',
        url: '/api/Order/GetAllUnfinishedOrdersNum',
    })
}
export function GetAllUnfinishedOrders(pageSize, currentPage) {
    return request({
        method: 'GET',
        url: '/api/Order/GetAllUnfinishedOrders',
        params: {
            pageSize: pageSize,
            currentPage: currentPage,
        }
    })
}
//待评价订单
export function GetAllUnevaluatedOrdersNum() {
    return request({
        method: 'GET',
        url: '/api/Order/GetAllUnevaluatedOrdersNum',
    })
}
export function GetAllUnevaluatedOrders(pageSize, currentPage) {
    return request({
        method: 'GET',
        url: '/api/Order/GetAllUnevaluatedOrders',
        params: {
            pageSize: pageSize,
            currentPage: currentPage,
        }
    })
}
//已完成订单
export function GetAllEvaluatedOrdersNum() {
    return request({
        method: 'GET',
        url: '/api/Order/GetAllEvaluatedOrdersNum',
    })
}
export function GetAllEvaluatedOrders(pageSize, currentPage) {
    return request({
        method: 'GET',
        url: '/api/Order/GetAllEvaluatedOrders',
        params: {
            pageSize: pageSize,
            currentPage: currentPage,
        }
    })
}
