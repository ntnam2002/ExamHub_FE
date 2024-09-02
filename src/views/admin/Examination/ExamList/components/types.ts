// types.ts
export interface Exam {
    _id: string
    exam_name: string
    description: string
    duration_minutes: number
    questions: string[]
    // thêm các trường khác nếu cần
}
