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
export async function apiGetTeacherToEdit<T, U extends { id: string }>(
    data: U
) {
    const { id } = data
    return ApiService.fetchData<T>({
        url: `/users/getTeacherById/${id}`,
        method: 'get',
    })
}
export async function apiUpdateUser<T, U extends { id: string }>(data: U) {
    console.log('data', data)
    const { id } = data
    return ApiService.fetchData<T>({
        url: `/users/updateUser/${id}`,
        method: 'post',
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
export async function apiCreateClass<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/admin/createClass',
        method: 'post',
        data,
    })
}
export async function apiUpdateClass<T, U extends { id: string }>(data: U) {
    const { id } = data
    return ApiService.fetchData<T>({
        url: `/admin/updateClass/${id}`,
        method: 'put',
        data,
    })
}
export async function apiDeleteClass<T, U extends { id: string }>(data: U) {
    const { id } = data
    return ApiService.fetchData<T>({
        url: `/admin/deleteClass/${id}`,
        method: 'delete',
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

export async function apiCreateDepartment<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/admin/createDepartment',
        method: 'post',
        data,
    })
}

export async function apiUpdateDepartment<T, U extends { id: string }>(
    data: U
) {
    const { id } = data
    return ApiService.fetchData<T>({
        url: `/admin/updateDepartment/${id}`,
        method: 'put',
        data,
    })
}

export async function apiDeleteDepartment<T, U extends { id: string }>(
    data: U
) {
    const { id } = data
    return ApiService.fetchData<T>({
        url: `/admin/deleteDepartment/${id}`,
        method: 'delete',
    })
}

export async function apiGetAllSubject<T, U extends Record<string, unknown>>() {
    return ApiService.fetchData<T>({
        url: '/admin/getAllSubject',
        method: 'get',
    })
}
export async function apiCreateSubject<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/admin/createSubject',
        method: 'post',
        data,
    })
}
