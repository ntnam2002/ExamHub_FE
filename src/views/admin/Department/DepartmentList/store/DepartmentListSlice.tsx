import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiDeleteDepartment,
    apiDeleteUser,
    apiGetAllDepartment,
    apiGetAllStudent,
} from '@/services/AdminService'
import type { TableQueries } from '@/@types/common'

type Department = {
    _id: string
    department_name: string
    teacher_ids: string[]
    class_ids: string[]
}

type Departments = Department[]

type GetDepartmentResponse = {
    data: Departments
}

type FilterQueries = {
    name: string
    //category: string[]
}

export type DepartmentListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedDepartment: string
    tableData: TableQueries
    filterData: FilterQueries
    departmentList: Departments
}

type GetDepartmentRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'DepartmentList'

export const getDepartments = createAsyncThunk(
    SLICE_NAME + '/getDepartmentList',
    async () => {
        const response = await apiGetAllDepartment<
            GetDepartmentResponse,
            GetDepartmentRequest
        >()

        return response.data
    }
)

export const deleteDepartment = async (data: { id: string }) => {
    const response = await apiDeleteDepartment<boolean, { id: string }>(data)
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

const initialState: DepartmentListState = {
    loading: false,
    deleteConfirmation: false,
    selectedDepartment: '',
    departmentList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
    },
}

const departmentListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateDepartmentList: (state, action) => {
            state.departmentList = action.payload
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
        setSelectedDepartment: (state, action) => {
            state.selectedDepartment = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDepartments.fulfilled, (state, action) => {
                state.departmentList = action.payload
                state.loading = false
            })
            .addCase(getDepartments.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateDepartmentList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedDepartment,
} = departmentListSlice.actions

export default departmentListSlice.reducer
