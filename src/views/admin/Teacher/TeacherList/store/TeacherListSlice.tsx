import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiDeleteUser,
    apiGetAllStudent,
    apiGetAllTeacher,
} from '@/services/AdminService'
import type { TableQueries } from '@/@types/common'

type Teacher = {
    _id: string
    username: string
    name: string
    email: string
    role: string
    class_ids: string[]
    department_id: string
    created_at: Date
}

type Teachers = Teacher[]

type GetTeacherResponse = {
    data: Teachers
    //total: number
}

type FilterQueries = {
    name: string
    //category: string[]
}

export type TeacherListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedTeacher: string
    tableData: TableQueries
    filterData: FilterQueries
    teacherList: Teachers
}

type GetTeacherRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'TeacherList'

export const getTeachers = createAsyncThunk(
    SLICE_NAME + '/getTeacherList',
    async () => {
        const response = await apiGetAllTeacher<
            GetTeacherResponse,
            GetTeacherRequest
        >()

        return response.data
    }
)

export const deleteTeacher = async (data: { id: string }) => {
    const response = await apiDeleteUser<boolean, { id: string }>(data)
    return response
}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

const initialState: TeacherListState = {
    loading: false,
    deleteConfirmation: false,
    selectedTeacher: '',
    teacherList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
    },
}

const teacherListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateTeacherList: (state, action) => {
            state.teacherList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedTeacher: (state, action) => {
            state.selectedTeacher = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTeachers.fulfilled, (state, action) => {
                state.teacherList = action.payload
                state.loading = false
            })
            .addCase(getTeachers.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateTeacherList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedTeacher,
} = teacherListSlice.actions

export default teacherListSlice.reducer
