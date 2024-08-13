import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
    apiDeleteUser,
    apiGetStudentToEdit,
    apiUpdateUser,
} from '@/services/AdminService'

type StudentData = {
    id?: string
    username?: string
    email?: string
    role?: string
    class_ids?: string[]
    department_id?: string
}

export type SalesProductEditState = {
    loading: boolean
    StudentData: StudentData
}

type GetStudentResponse = StudentData

export const SLICE_NAME = 'StudentEdit'

export const getStudentToEdit = createAsyncThunk(
    SLICE_NAME + '/getStudentToEdit',
    async (data: { id: string }) => {
        const response = await apiGetStudentToEdit<
            GetStudentResponse,
            { id: string }
        >(data)
        return response.data
    }
)

export const updateStudent = async <T, U extends { id: string }>(
    data: U
) => {
    const response = await apiUpdateUser<T, U>(data)
    return response.data
}

export const deleteStudent = async (data: { id: string }) => {
    const response = await apiDeleteUser<boolean, { id: string }>(data)
    return response
}
const initialState: SalesProductEditState = {
    loading: true,
    StudentData: {},
}

const productEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStudentToEdit.fulfilled, (state, action) => {
                state.StudentData = action.payload
                state.loading = false
            })
            .addCase(getStudentToEdit.pending, (state) => {
                state.loading = true
            })
    },
})

export default productEditSlice.reducer
