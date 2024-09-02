import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiDeleteSubject,
    apiGetAllSubject,
} from '@/services/managementService'
import type { TableQueries } from '@/@types/common'

type Subject = {
    _id: string
    subject_name: string
    specializtion: string
    created_at: Date
}

type Subjects = Subject[]

type GetSubjectResponse = {
    data: Subjects
}

type FilterQueries = {
    name: string
}

export type SubjectListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedSubject: string
    tableData: TableQueries
    filterData: FilterQueries
    subjectList: Subjects
}

type GetSubjectRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'SubjectList'

export const getSubjects = createAsyncThunk(
    SLICE_NAME + '/getSubjectList',
    async () => {
        const response = await apiGetAllSubject<
            GetSubjectResponse,
            GetSubjectRequest
        >()

        return response.data
    }
)

export const deleteSubject = async (data: { id: string }) => {
    const response = await apiDeleteSubject<boolean, { id: string }>(data)
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

const initialState: SubjectListState = {
    loading: false,
    deleteConfirmation: false,
    selectedSubject: '',
    subjectList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
    },
}

const subjectListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateSubjectList: (state, action) => {
            state.subjectList = action.payload
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
        setSelectedSubject: (state, action) => {
            state.selectedSubject = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSubjects.fulfilled, (state, action) => {
                state.subjectList = action.payload
                state.loading = false
            })
            .addCase(getSubjects.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateSubjectList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedSubject,
} = subjectListSlice.actions

export default subjectListSlice.reducer
