import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiDeleteClass, apiGetAllClass } from '@/services/AdminService'
import type { TableQueries } from '@/@types/common'

type Class = {
    _id: string
    class_name: string
    teacherId: string
    student_ids: string[]
    create_at: Date
    update_at: Date
}

type Classes = Class[]

type GetClassesResponse = Classes

type FilterQueries = {
    name: string
    //category: string[]
}

export type ClassListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedClass: string
    tableData: TableQueries
    filterData: FilterQueries
    classList: Class[]
}

type GetClassesRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'ClassesList'

export const getClassess = createAsyncThunk(
    SLICE_NAME + '/getClassesList',
    async () => {
        const response = await apiGetAllClass<
            GetClassesResponse,
            GetClassesRequest
        >()

        return response.data
    }
)

export const deleteClass = async (data: { id: string }) => {
    const response = await apiDeleteClass<boolean, { id: string }>(data)
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

const initialState: ClassListState = {
    loading: false,
    deleteConfirmation: false,
    selectedClass: '',
    classList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
    },
}

const classesListState = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateClassList: (state, action) => {
            state.classList = action.payload
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
        setSelectedClass: (state, action) => {
            state.selectedClass = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getClassess.fulfilled, (state, action) => {
                state.classList = action.payload
                state.loading = false
            })
            .addCase(getClassess.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateClassList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedClass,
} = classesListState.actions

export default classesListState.reducer
