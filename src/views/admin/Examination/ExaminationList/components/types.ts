// types.ts

export interface Examination {
    _id: string
    exam_id: string
    question_id: string[] // Dùng string[] nếu ID là chuỗi
    class_id: string[]
    student_id: string[]
    access_keys: string
    started_at: Date
    created_by: string
    total_score: number
}
