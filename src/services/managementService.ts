import ApiService from './ApiService'

export function apiGetAllBehavior<T, U extends Record<string, unknown>>() {
    return ApiService.fetchData<T>({
        url: '/management/getAllBehavior',
        method: 'get',
    })
}

export function apiGetAllLoginLogs<T, U extends Record<string, unknown>>() {
    return ApiService.fetchData<T>({
        url: '/management/getAllLoginLogs',
        method: 'get',
    })
}

export function apiGetAllSubject<T, U extends Record<string, unknown>>() {
    return ApiService.fetchData<T>({
        url: '/management/subject',
        method: 'get',
    })
}

export function apiCreateSubject<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/management/subject',
        method: 'post',
        data,
    })
}

export function apiUpdateSubject<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/management/subject',
        method: 'put',
        data,
    })
}

export function apiDeleteSubject<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/management/subject',
        method: 'delete',
        data,
    })
}
