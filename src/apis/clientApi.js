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

