import ApiService from './ApiService'
import { apiGetAllDepartment } from '@/services/AdminService'

export function apiGetAllBehavior<T, U extends Record<string, unknown>>() {
    return ApiService.fetchData<T>({
        url: '/management/getAllBehavior',
        method: 'get',
    })
}

export function apiGetAllLoginLogs<T>(params: { page: number; size: number }) {
    return ApiService.fetchData<T>({
        url: '/management/getAllLoginLogs',
        method: 'get',
        params: {
            page: params.page,
            size: params.size,
        },
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
    const { id } = data
    return ApiService.fetchData<T>({
        url: '/management/subject/' + id,
        method: 'delete',
        data,
    })
}

export function apiSearchBehavior<T, U extends Record<string, unknown>>(
    query: string
) {
    return ApiService.fetchData<T>({
        url: `/management/searchBehavior?search=${query}`,
        method: 'get',
    })
}

export function systemStatistic<T, U extends Record<string, unknown>>() {
    return ApiService.fetchData<T>({
        url: '/management/statistic',
        method: 'get',
    })
}

export function apiSearchSystemLog<T, U extends Record<string, unknown>>(
    query: string
) {
    return ApiService.fetchData<T>({
        url: `/management/searchStatistic?search=${query}`,
        method: 'get',
    })
}

export function apiCreateDepartment<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/admin/addDepartment',
        method: 'post',
        data,
    })
}

export function apiUpdateDepartment<T, U extends { id: string }>(data: U) {
    const { id } = data
    return ApiService.fetchData<T>({
        url: `/admin/updateDepartment/${id}`,
        method: 'put',
        data,
    })
}

export function apiDeleteDepartment<T, U extends { id: string }>(data: U) {
    const { id } = data
    return ApiService.fetchData<T>({
        url: `/admin/deleteDepartment/${id}`,
        method: 'delete',
    })
}
