import request from "@/utils/request";

export function getDefaultText() {
    return request({
        url: '/search/default-text',
        method: 'GET'
    })
}

export function getSearchHotList() {
    return request({
        url: '/search/hot-list',
        method: 'GET'
    })
}

export function getSearchResult(data) {
    return request({
        url: '/search',
        data: data,
        method: "GET"
    })
}
