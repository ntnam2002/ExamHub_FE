import ApiService from './ApiService'

export async function apiGetAllQuestions<
    T,
    U extends Record<string, unknown>
>() {
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

export async function apiSendAnswers<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: `/exams/${data.examId}/score/${data.studentId}`,
        method: 'post',
        data,
    })
}
