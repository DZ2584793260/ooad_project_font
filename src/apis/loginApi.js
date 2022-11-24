import request from '../utils/request';

export function administratorLogin(id, password) {
    return request({
        method: 'GET',
        url: '/api/administration/getadministration',
        params: {
            account: id,
            password: password
        }
    })
}
export function userSignIn(id, password) {
    return request({
        method: 'GET',
        url: '/api/user/getuser',
        params: {
            account: id,
            password: password
        }
    })
}
export function userSignUp(nickName, account, password, phoneNumber) {
    return request({
        method: 'POST',
        url: '/api/user/adduser',
        data: {
            nickName: nickName,
            account: account,
            password: password,
            phoneNumber: phoneNumber
        }
    })
}
export function forgetPassword() {

}