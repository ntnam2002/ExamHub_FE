import ApiService from './ApiService'

export async function apiGetAllStudent<T, U extends Record<string, unknown>>() {
    return ApiService.fetchData<T>({
        url: '/users/getAllstudents',
        method: 'get',
    })
}
export async function apiGetAllTeacher<T, U extends Record<string, unknown>>() {
    return ApiService.fetchData<T>({
        url: '/users/getAllteachers',
        method: 'get',
    })
}

export async function apiDeleteUser<T, U extends { id: string }>(data: U) {
    const { id } = data

    return ApiService.fetchData<T>({
        url: `/users/deleteUser/${id}`,
        method: 'delete',
    })
}
export async function apiGetStudentToEdit<T, U extends { id: string }>(
    data: U
) {
    const { id } = data
    return ApiService.fetchData<T>({
        url: `/users/getStudentById/${id}`,
        method: 'get',
    })
}
export async function apiUpdateUser<T, U extends { id: string }>(data: U) {
    const { id } = data
    return ApiService.fetchData<T>({
        url: `/users/updateUser/${id}`,
        method: 'put',
        data,
    })
}
export async function apiCreateUser<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/users/register',
        method: 'post',
        data,
    })
}
export async function apiGetAllClass<T, U extends Record<string, unknown>>() {
    return ApiService.fetchData<T>({
        url: '/admin/getAllClass',
        method: 'get',
    })
}

export async function apiGetAllDepartment<
    T,
    U extends Record<string, unknown>
>() {
    return ApiService.fetchData<T>({
        url: '/admin/getAllDepartment',
        method: 'get',
    })
}
