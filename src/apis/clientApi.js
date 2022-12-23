import request from '../utils/request';
export function getHotelAll(pageSize, currentPage) {
    return request({
        method: 'GET',
        url: '/api/HotelInstance/getallhotels',
        params: {
            pagesize: pageSize,
            currentpage: currentPage
        }
    })
}
export function getHotelAllCount() {
    return request({
        method: 'GET',
        url: '/api/HotelInstance/getallcount',
    })
}
export function getHotelConditional(pageSize, currentPage, citySelected, keyword) {
    return request({
        method: 'GET',
        url: '/api/HotelInstance/gethotelsbycondition',
        params: {
            pagesize: pageSize,
            currentpage: currentPage,
            city: citySelected,
            keys: keyword
        }
    })
}
export function getRConditionCount(citySelected, keyword) {
    return request({
        method: 'GET',
        url: '/api/HotelInstance/getcountbycondition',
        params: {
            city: citySelected,
            keys: keyword
        }
    })
}


//YUKI: conditional query the room
export function queryRoomConditional(companyGroupID, hotelName, Price, StartTime, EndTime, pageSize, currentPage) {
    return request({
        method: 'GET',
        url: '/api/room/gethotelguestroomsconditional',
        params: {
            companyGroupID: companyGroupID,
            hotelName: hotelName,
            Price: Price,
            StartTime: StartTime,
            EndTime: EndTime,
            pageSize: pageSize,
            currentPage: currentPage
        }
    })
}

export function queryRoomConditionalCount(companyGroupID, hotelName, Price, StartTime, EndTime) {
    return request({
        method: 'GET',
        url: '/api/room/gethotelguestroomsconditionalcount',
        params: {
            companyGroupID: companyGroupID,
            hotelName: hotelName,
            Price: Price,
            StartTime: StartTime,
            EndTime: EndTime
        }
    })
}

///////////消息通知系统
export function getMessage(account) {
    return request({
        method: 'GET',
        url: '/api/user/getinfobyuser',
        params: {
            account: account
        }
    })
}
export function deleteAllMessage(account) {
    return request({
        method: 'GET',
        url: '/api/user/clearifyinfobyuser',
        params: {
            account: account
        }
    })
}
//////////收藏功能
export function subscribeHotel(account, hotelName) {
    return request({
        method: 'GET',
        url: '/api/hotelinstance/subscribehotel',
        params: {
            account: account,
            hotelName: hotelName
        }
    })
}
export function unsubscribeHotel(account, hotelName) {
    return request({
        method: 'GET',
        url: '/api/hotelinstance/unsubscribehotel',
        params: {
            account: account,
            hotelName: hotelName
        }
    })
}
export function getHotelsCountSubscribed(account) {
    return request({
        method: 'GET',
        url: '/api/hotelinstance/gethotelscountsubscribed',
        params: {
            account: account,
        }
    })
}
export function getHotelsSubscribed(pageSize, currentPage, account) {
    return request({
        method: 'GET',
        url: '/api/hotelinstance/gethotelssubscribed',
        params: {
            pageSize: pageSize,
            currentPage: currentPage,
            account: account,
        }
    })
}
