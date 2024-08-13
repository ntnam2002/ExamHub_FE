import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiDeleteUser, apiGetAllStudent } from '@/services/AdminService'
import type { TableQueries } from '@/@types/common'

type Student = {
    _id: string
    username: string
    name: string
    email: string
    role: string
    class_ids: string[]
    department_id: string
    created_at: Date
}

type Students = Student[]

type GetStudentResponse = {
    data: Students
    //total: number
}

type FilterQueries = {
    name: string
    //category: string[]
}

export type SalesProductListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedProduct: string
    tableData: TableQueries
    filterData: FilterQueries
    studentList: Students
}

type GetStudentRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'StudentList'

export const getStudents = createAsyncThunk(
    SLICE_NAME + '/getStudentList',
    async () => {
        const response = await apiGetAllStudent<
            GetStudentResponse,
            GetStudentRequest
        >()

        return response.data
    }
)

export const deleteProduct = async (data: { id: string }) => {
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

const initialState: SalesProductListState = {
    loading: false,
    deleteConfirmation: false,
    selectedProduct: '',
    studentList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
    },
}

const studentListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateStudentList: (state, action) => {
            state.studentList = action.payload
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
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStudents.fulfilled, (state, action) => {
                state.studentList = action.payload
                state.loading = false
            })
            .addCase(getStudents.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateStudentList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedProduct,
} = studentListSlice.actions

export default studentListSlice.reducer
