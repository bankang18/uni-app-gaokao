import request from "@/utils/request";

export function getHotTabs() {
    return request({
        url: '/hot/tabs',
        method: 'GET'
    })
}

export function getHotListFromTabType (type) {
    return request({
        url: '/hot/list',
        method: 'GET',
        data: {
            type: type
        }
    })
}