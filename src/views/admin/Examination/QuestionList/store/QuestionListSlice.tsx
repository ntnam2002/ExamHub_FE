import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import type { TableQueries } from '@/@types/common'
import { apiDeleteQuestion, apiGetAllQuestions } from '@/services/ExamService'

type Question = {
    _id: string
    text: string
    options: string[]
    correctOption: string
    created_at: Date
}

type Questions = Question[]

type GetQuestionsResponse = {
    data: Questions
}

type FilterQueries = {
    text: string
}

export type QuestionsListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedQuestion: string
    tableData: TableQueries
    filterData: FilterQueries
    questionList?: Questions
}

type GetQuestionsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'questionList'

export const getQuestions = createAsyncThunk(
    SLICE_NAME + '/getQuestionList',
    async () => {
        const response = await apiGetAllQuestions<
            GetQuestionsResponse,
            GetQuestionsRequest
        >()
        return response.data
    }
)

export const deleteQuestion = async (data: { id: string }) => {
    const response = await apiDeleteQuestion<boolean, { id: string }>(data)
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

const initialState: QuestionsListState = {
    loading: false,
    deleteConfirmation: false,
    selectedQuestion: '',
    questionList: [],
    tableData: initialTableData,
    filterData: {
        text: '',
    },
}

const questionsListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateQuestionList: (state, action) => {
            state.questionList = action.payload
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
        setSelectedQuestion: (state, action) => {
            state.selectedQuestion = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getQuestions.fulfilled, (state, action) => {
                state.questionList = action.payload
                state.loading = false
            })
            .addCase(getQuestions.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateQuestionList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedQuestion,
} = questionsListSlice.actions

export default questionsListSlice.reducer
