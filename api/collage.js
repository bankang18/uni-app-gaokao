import requestGET from "@/utils/requestGET";

export function getHotCollage() {
    return requestGET({
        url: '/collage/hot',
        method: 'GET'
    })
}

export function getProvince() {
    return requestGET({
        url: '/collage/province',
        method: 'GET'
    })
}

export function getCity(data) {
    return requestGET({
        url: '/collage/city',
        method: 'GET',
        data: data
    })
}

export function getCollageList(data) {
    return requestGET({
        url: '/collage/collage',
        method: 'GET',
        data: data
    })
}