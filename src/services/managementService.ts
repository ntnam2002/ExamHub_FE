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
