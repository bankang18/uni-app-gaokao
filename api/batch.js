import requestGET from "@/utils/requestGET";

export function getBatchList(data) {
    return requestGET({
        url: '/batch/list',
        method: 'GET',
        data: data
    })
}