import requestPOST from "@/utils/requestPOST";

export function getOpenid(data) {
    return requestPOST({
        url: '/member/openid',
        method: 'POST',
        data: data
    })
}

export function login(data) {
    return requestPOST({
        url: '/member/login',
        method: 'POST',
        data: data
    })
}

export function editNickname(data) {
    return requestPOST({
        url: '/member/nickname',
        method: 'POST',
        data: data
    })
}

export function editMobile(data) {
    return requestPOST({
        url: '/member/mobile',
        method: 'POST',
        data: data
    })
}

export function editStudentInfo(data) {
    return requestPOST({
        url: '/member/studentInfo',
        method: 'POST',
        data: data
    })
}