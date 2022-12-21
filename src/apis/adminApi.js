
import request from '../utils/request';
//YUKI: graph api -> success
export function adminGraphing() {
    return request({
        method: 'GET',
        url: '/api/Order/GetWeekOrderCountByDay',
        params: {
            //So what params shall I put->nothing
        }
    })
}

export function adminGetDefaultCount() {
    return request({
        method: 'GET',
        url: '/api/room/getallroomscount'
    })


}

export function adminGetCountConditional(companyGroupID, hotelName) {
    return request({
        method: 'GET',
        url: '/api/room/gethotelroomscount',
        params: {
            companyGroupID: companyGroupID,
            hotelName: hotelName
        }
    })
}

//YUKI: first time to admin without any hotel instance information, return all rooms in our groups
export function adminGetAllDefaultRooms(pageSize, currentPage) {
    return request({
        method: 'GET',
        url: '/api/room/getallrooms',
        params: {
            pagesize: pageSize,
            currentpage: currentPage
        }
    })
}

//YUKI: select the rooms by its companyID and hotelName
export function adminGetRoomsByCondition(pageSize, currentPage, companyGroupID, hotelName) {
    return request({
        method: 'GET',
        url: '/api/room/gethotelrooms',
        params: {
            pagesize: pageSize,
            currentpage: currentPage,
            companyGroupID: companyGroupID,
            hotelName: hotelName
        }
    })
}

//int-id
export function adminDeleteRoom(id) {
    return request({
        method: 'DELETE',
        url: '/api/room/deleteguestroom',
        params: {
            ID: id
        }
    })
}

//int-id,
export function adminModifyRoom(id, roomStatus, price, ichnography) {
    return request({
        method: 'PUT',
        url: '/api/room/modifyguestroom',
        data: {
            id: id,
            roomStatus: roomStatus,
            price: price,
            ichnography: ichnography
        }
    })
}

export function adminAddRoom(Floor, Address, RoomStatus, RoomType, HotelInstanceID, Price, Title, Ichnography, Area, BedCount, WindowCount, MineralWaterCount, CandomCount) {
    return request({
        method: 'POST',
        url: '/api/room/addguestroom',
        data: {
            Floor: Floor,
            Address: Address,
            RoomStatus: RoomStatus,
            RoomType: RoomType,
            HotelInstanceID: HotelInstanceID,
            Price: Price,
            Title: Title,
            Ichnography: Ichnography,
            Area: Area,
            BedCount: BedCount,
            WindowCount: WindowCount,
            MineralWaterCount: MineralWaterCount,
            CandomCount: CandomCount
        }
    })
}

//YUKI:add factors
export function adminPriceStatusSelect(companyGroupID, hotelName, Price, PageSize, currentPage, roomStatus) {
    return request({
        method: 'GET',
        url: '/api/room/gethotelguestroomsconditionaladmin',
        params: {
            companyGroupID: companyGroupID,
            hotelName: hotelName,
            Price: Price,
            PageSize: PageSize,
            currentPage: currentPage,
            roomStatus: roomStatus
        }
    })
}

export function adminPriceStatusSelectCount(companyGroupID, hotelName, Price, roomStatus) {
    return request({
        method: 'GET',
        url: '/api/room/gethotelguestroomsconditionaladmincount',
        params: {
            companyGroupID: companyGroupID,
            hotelName: hotelName,
            Price: Price,
            roomStatus: roomStatus
        }
    })
}

export function adminPriceSelect(companyGroupID, hotelName, PageSize, currentPage, Price) {
    return request({
        method: 'GET',
        url: '/api/room/gethotelguestroomsconditionaladmin',
        params: {
            companyGroupID: companyGroupID,
            hotelName: hotelName,
            PageSize: PageSize,
            currentPage: currentPage,
            Price: Price
        }
    })
}

export function adminPriceSelectCount(companyGroupID, hotelName, Price) {
    return request({
        method: 'GET',
        url: '/api/room/gethotelguestroomsconditionaladmincount',
        params: {
            companyGroupID: companyGroupID,
            hotelName: hotelName,

            Price: Price
        }
    })
}