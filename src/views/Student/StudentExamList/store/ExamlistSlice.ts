import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetExaminationForStudent,
    apiSendAnswers,
} from '@/services/ExamService'
import { jwtDecode } from 'jwt-decode'

// Utility function to extract student ID from JWT token
export const getStudentIdFromToken = () => {
    const authString = localStorage.getItem('admin')
    if (!authString) throw new Error('No auth found in localStorage')
    const parsedAuth = JSON.parse(authString)
    const nestedAuth = JSON.parse(parsedAuth.auth)
    const token = nestedAuth.user.accessToken
    if (!token) throw new Error('No access token found in auth')
    const decoded: { _id: string } = jwtDecode(token)
    return decoded._id
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

type Exam = {
    _id: string
    exam_name: string
    description: string
    questions: Question[]
    created_by: string
    duration_minutes: number
    created_at: string
    updated_at: string
    __v: number
}

type Examination = {
    _id: string
    exam_id: Exam
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

export type ExaminationListState = {
    loading: boolean
    examinationList: Examination[]
}

export type ExaminationListReponse = Examination[]

// Initial state for the slice
const initialState: ExaminationListState = {
    loading: false,
    examinationList: [],
}

export const SLICE_NAME = 'examinationList'

// Async thunk to fetch examinations for the student
export const getExaminations = createAsyncThunk(
    'examinationList/getExaminations',
    async () => {
        try {
            const studentId = getStudentIdFromToken() // Get student ID from JWT token
            const response = await apiGetExaminationForStudent<
                ExaminationListReponse,
                { student_id: string }
            >({
                student_id: studentId,
            })

            return response.data // Return the fetched examination data
        } catch (error) {
            console.error('Error fetching examinations:', error)
            throw error // Ensure errors are propagated
        }
    }
)

export const sendAnswer = createAsyncThunk(
    'examinationList/sendAnswer',
    async (data: {
        examId: string
        studentId: string
        answers: { questionId: string; selectedOptionId: string }[]
    }) => {
        try {
            const response = await apiSendAnswers(data)
            console.log('Answer sent:', response.data)
            return response.data
        } catch (error) {
            console.error('Error sending answer:', error)
            throw error
        }
    }
)

// export const getScore = createAsyncThunk(
//     'examinationList/getScore',
//     async ({ examId, studentId }: { examId: string; studentId: string }) => {
//         const response = await apiGetScore({ examId, studentId })
//         return response.data
//     }
// )
// Create the examination list slice
const examinationListSlice = createSlice({
    name: 'examinationList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getExaminations.pending, (state) => {
                state.loading = true
            })
            .addCase(getExaminations.fulfilled, (state, action) => {
                state.loading = false
                state.examinationList = action.payload
            })
            .addCase(getExaminations.rejected, (state) => {
                state.loading = false
            })
            .addCase(sendAnswer.pending, (state) => {
                state.loading = true
            })
            .addCase(sendAnswer.fulfilled, (state, action) => {
                state.loading = false
                console.log('Answer submission response:', action.payload)
            })
            .addCase(sendAnswer.rejected, (state) => {
                state.loading = false
            })
    },
})

// Export the reducer generated by createSlice
export default examinationListSlice.reducer
