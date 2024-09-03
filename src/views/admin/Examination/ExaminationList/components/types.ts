// types.ts

export interface Examination {
    // _id: string
    exam_id: string
    class_id: string[]
    student_id: string[]
    access_keys: string
    started_at: Date
    // created_by: string
    // total_score: number
}
export interface IExamination {
    exam_id: string
    class_id: string[]
    student_id: string[]
    access_keys: string
    started_at: Date
}
