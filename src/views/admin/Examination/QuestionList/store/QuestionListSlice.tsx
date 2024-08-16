import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiDeleteQuestion, apiGetAllQuestions } from '@/services/ExamService'
import type { TableQueries } from '@/@types/common'

// Định nghĩa kiểu cho câu hỏi
type Option = {
    _id: string
    text: string
    is_correct: boolean
}

type Question = {
    _id: string
    text: string
    points: number
    options: Option[]
    subjectId: string
    difficuty: string
    created_at: Date
}

type Questions = Question[]

// Định nghĩa kiểu cho phản hồi từ API
type GetQuestionsResponse = {
    data: Questions
}

// Định nghĩa kiểu cho dữ liệu lọc
type FilterQueries = {
    text: string
}

// Định nghĩa kiểu cho trạng thái của danh sách câu hỏi
export type QuestionsListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedQuestion: string
    tableData: TableQueries
    filterData: FilterQueries
    questionList: Questions // Đặt mặc định là mảng rỗng thay vì undefined
}

// Thay đổi kiểu của yêu cầu để bao gồm dữ liệu lọc
type GetQuestionsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'questionList'

// Tạo thunk để lấy danh sách câu hỏi
export const getQuestions = createAsyncThunk(
    `${SLICE_NAME}/getQuestions`,
    async () => {
        const response = await apiGetAllQuestions<
            GetQuestionsResponse,
            GetQuestionsRequest
        >()
        return response.data
    }
)

// Tạo thunk để xóa câu hỏi
export const deleteQuestion = createAsyncThunk(
    `${SLICE_NAME}/deleteQuestion`,
    async (id: string) => {
        const response = await apiDeleteQuestion<boolean, { id: string }>({
            id,
        })
        return response
    }
)

// Định nghĩa dữ liệu ban đầu cho bảng
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

// Định nghĩa trạng thái ban đầu
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

// Tạo slice cho danh sách câu hỏi
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
            .addCase(getQuestions.rejected, (state, action) => {
                state.loading = false
                console.error(
                    'Failed to fetch questions:',
                    action.error.message
                )
            })
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                if (action.payload) {
                    state.questionList = state.questionList.filter(
                        (question) => question._id !== state.selectedQuestion
                    )
                    state.deleteConfirmation = false
                }
            })
            .addCase(deleteQuestion.rejected, (state, action) => {
                console.error(
                    'Failed to delete question:',
                    action.error.message
                )
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
