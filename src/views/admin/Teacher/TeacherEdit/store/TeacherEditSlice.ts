import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
    apiDeleteUser,
    apiGetTeacherToEdit,
    apiUpdateUser,
} from '@/services/AdminService'

type TeacherData = {
    id?: string
    username?: string
    email?: string
    role?: string
    class_ids?: string[]
    department_id?: string
}

export type TeacherEditState = {
    loading: boolean
    TeacherData: TeacherData
}

type GetTeacherResponse = TeacherData

export const SLICE_NAME = 'TeacherEdit'

export const getTeacherToEdit = createAsyncThunk(
    SLICE_NAME + '/getTeacherToEdit',
    async (data: { id: string }) => {
        const response = await apiGetTeacherToEdit<
            GetTeacherResponse,
            { id: string }
        >(data)
        return response.data
    }
)

export const updateTeacher = async <T, U extends { id: string }>(data: U) => {
    const response = await apiUpdateUser<T, U>(data)
    return response.data
}

export const deleteTeacher = async (data: { id: string }) => {
    const response = await apiDeleteUser<boolean, { id: string }>(data)
    return response
}

const initialState: TeacherEditState = {
    loading: true,
    TeacherData: {},
}

const TeacherEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTeacherToEdit.fulfilled, (state, action) => {
                state.TeacherData = action.payload
                state.loading = false
            })
            .addCase(getTeacherToEdit.pending, (state) => {
                state.loading = true
            })
    },
})

export default TeacherEditSlice.reducer
