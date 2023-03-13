import requestGET from "@/utils/requestGET";

export function getFirstSubject() {
    return requestGET({
        url: '/subject/first',
        method: 'GET'
    })
}

export function getSecondSubject(data) {
    return requestGET({
        url: '/subject/second',
        method: 'GET',
        data: data
    })
}

export function getHotSubject() {
    return requestGET({
        url: '/subject/hot',
        method: 'GET',
    })
}

export function getSubjectList(data) {
    return requestGET({
        url: '/subject/subject',
        method: 'GET',
        data: data
    })
}