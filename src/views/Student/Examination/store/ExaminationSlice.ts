import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetExaminationQuestion,
    apiSendAnswers,
} from '@/services/ExamService'

export const getExaminationIdFromLocalStorage = () => {
    const examinationId = localStorage.getItem('examinationId')
    if (!examinationId)
        throw new Error('No examination ID found in localStorage')
    return examinationId
}

// Define types for examinations and their nested structures
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
    created_at: string
    __v: number
}

type Examination = {
    _id: string
    exam_id: string
    question_id: string[]
    class_id: string[]
    student_id: string[]
    questions: Question[]
    access_keys: string
    created_by: string
    total_score: number
    started_at: string
    createdAt: string
    updatedAt: string
    __v: number
}

export type ExaminationDataListState = {
    loading: boolean
    examinationQuestionList: Examination[]
}

export type ExaminationQuestionListResponse = Examination[]

// Initial state for the slice
const initialState: ExaminationDataListState = {
    loading: false,
    examinationQuestionList: [],
}

export const SLICE_NAME = 'examinationQuestionList'

// Async thunk to get questions by exam ID
export const getQuestionsByExamId = createAsyncThunk(
    'examinationQuestionList/getQuestionsByExamId',

    async () => {
        try {
            const examinationId = getExaminationIdFromLocalStorage()
            const response =
                await apiGetExaminationQuestion<ExaminationQuestionListResponse>(
                    examinationId
                )
            return response.data
        } catch (error) {
            console.error('Error fetching questions:', error)
            throw error
        }
    }
)

export const sendAnswer = createAsyncThunk(
    'examinationQuestionList/sendAnswer',
    async (data: {
        examId: string
        studentId: string
        answers: { questionId: string; selectedOptionId: string }[]
    }) => {
        try {
            const response = await apiSendAnswers(data)
            return response.data
        } catch (error) {
            console.error('Error sending answer:', error)
            throw error
        }
    }
)

// Create the examination list slice
const examinationQuesionListSlice = createSlice({
    name: 'examinationQuestionList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getQuestionsByExamId.pending, (state) => {
             
                state.loading = true
            })
            .addCase(getQuestionsByExamId.fulfilled, (state, action) => {
                
                state.loading = false
                state.examinationQuestionList = action.payload
            })
            .addCase(getQuestionsByExamId.rejected, (state, action) => {
               
                state.loading = false
            })
            .addCase(sendAnswer.pending, (state) => {
                state.loading = true
            })
            .addCase(sendAnswer.fulfilled, (state, action) => {
                state.loading = false
               
            })
            .addCase(sendAnswer.rejected, (state) => {
                state.loading = false
            })
    },
})

// Export the actions and reducer generated by createSlice
export default examinationQuesionListSlice.reducer
