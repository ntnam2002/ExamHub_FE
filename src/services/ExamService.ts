import { xcode } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import ApiService, { IResponse } from './ApiService'
import {
    Examination,
    IExamination,
} from '@/views/admin/Examination/ExaminationList/components/types'
import { Exam } from '@/views/admin/Examination/ExamList/components/types'

export function apiGetExams() {
    return ApiService.fetchData<Exam[]>({
        url: '/exams',
        method: 'get',
    })
}
export function apiGetAllClasses() {
    return ApiService.fetchData<Exam[]>({
        url: '/admin/getAllClass',
        method: 'get',
    })
}
export function apiGetExaminations() {
    return ApiService.fetchData<Examination[]>({
        url: '/exams/examinations/getAll',
        method: 'get',
    })
}

export function apiCreateExamination(data: IExamination) {
    return ApiService.fetchData({
        url: '/exams/examinations',
        method: 'post',
        data,
    })
}

export function apiUpdateExamination(id: string, data: IExamination) {
    return ApiService.fetchData({
        url: `/exams/examinations/${id}`,
        method: 'put',
        data,
    })
}

export function apiDeleteExamination(id: string) {
    return ApiService.fetchData<void>({
        url: `/exams/examinations/${id}`,
        method: 'delete',
    })
}

export async function apiGetAllQuestions<T, U>() {
    return ApiService.fetchData<T>({
        url: '/exams/allquestions',
        method: 'get',
    })
}

export async function apiGetQuestionById<T, U extends { id: string }>(data: U) {
    const { id } = data
    return ApiService.fetchData<T>({
        url: `/exams/questions/${id}`,
        method: 'get',
    })
}

export async function apiCreateQuestion<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/exams/questions/createQuestion',
        method: 'post',
        data,
    })
}

export async function apiUpdateQuestion<T, U extends { id: string }>(data: U) {
    const { id } = data
    return ApiService.fetchData<T>({
        url: `/exams/questions/updateQuestion/${id}`,
        method: 'put',
        data,
    })
}

export async function apiDeleteQuestion<T, U extends { id: string }>(data: U) {
    const { id } = data
    return ApiService.fetchData<T>({
        url: `/exams/questions/${id}`,
        method: 'delete',
    })
}

export async function apiGetExaminationForStudent<
    T,
    U extends { student_id: string }
>(data: U) {
    try {
        const { student_id } = data

        const response = await ApiService.fetchData<T>({
            url: `/exams/examinations/student/${student_id}`,
            method: 'get',
        })
        return response
    } catch (error) {
        console.error('Error fetching examinations:', error)
        throw error
    }
}
// Adjust the import path as necessary

export async function apiGetExaminationQuestion<T>(
    examinationId: string
): Promise<IResponse<T>> {
    try {
        const response = await ApiService.fetchData<T>({
            url: `/exams/examinations/questions/${examinationId}`,
            method: 'get',
        })
        return response
    } catch (error) {
        console.error('Error fetching questions:', error)
        throw error
    }
}

export async function apiGetExaminationById<T, U extends { id: string }>(
    data: U
) {
    const { id } = data
    return ApiService.fetchData<T>({
        url: `/exams/examinations/${id}`,
        method: 'get',
    })
}

export async function apiSendAnswers<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: `/exams/${data.examId}/score/${data.studentId}`,
        method: 'post',
        data,
    })
}
