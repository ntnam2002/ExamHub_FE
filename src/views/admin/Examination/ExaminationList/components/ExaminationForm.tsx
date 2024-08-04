// ExaminationForm.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Examination } from './types' // Thay đổi đường dẫn nếu cần
import { apiCreateExamination, apiUpdateExamination } from './api' // Thay đổi đường dẫn nếu cần

interface ExaminationFormProps {
    examinationToEdit?: Examination
    onSave: () => void
    onCancel: () => void
}

const ExaminationForm: React.FC<ExaminationFormProps> = ({
    examinationToEdit,
    onSave,
    onCancel,
}) => {
    const [examination, setExamination] = useState<Examination>({
        _id: '',
        exam_id: '',
        question_id: [],
        class_id: [],
        student_id: [],
        access_keys: '',
        started_at: new Date(),
        created_by: '',
        total_score: 0,
    })

    useEffect(() => {
        if (examinationToEdit) {
            setExamination(examinationToEdit)
        }
    }, [examinationToEdit])

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target as
            | HTMLInputElement
            | HTMLTextAreaElement
        setExamination((prevExam) => ({ ...prevExam, [name]: value }))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (examination._id) {
            // Update logic using apiUpdateExamination
            apiUpdateExamination(examination._id, examination)
                .then(() => onSave())
                .catch((error) => console.error(error))
        } else {
            // Create logic using apiCreateExamination
            apiCreateExamination(examination)
                .then(() => onSave())
                .catch((error) => console.error(error))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Exam ID</label>
                <input
                    type="text"
                    name="exam_id"
                    value={examination.exam_id}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Question IDs</label>
                <input
                    type="text"
                    name="question_id"
                    value={examination.question_id.join(', ')}
                    onChange={(e) =>
                        handleChange({
                            target: {
                                name: 'question_id',
                                value: e.target.value
                                    .split(',')
                                    .map((id) => id.trim()),
                            },
                        })
                    }
                />
            </div>
            <div>
                <label>Class IDs</label>
                <input
                    type="text"
                    name="class_id"
                    value={examination.class_id.join(', ')}
                    onChange={(e) =>
                        handleChange({
                            target: {
                                name: 'class_id',
                                value: e.target.value
                                    .split(',')
                                    .map((id) => id.trim()),
                            },
                        })
                    }
                />
            </div>
            <div>
                <label>Student IDs</label>
                <input
                    type="text"
                    name="student_id"
                    value={examination.student_id.join(', ')}
                    onChange={(e) =>
                        handleChange({
                            target: {
                                name: 'student_id',
                                value: e.target.value
                                    .split(',')
                                    .map((id) => id.trim()),
                            },
                        })
                    }
                />
            </div>
            <div>
                <label>Access Keys</label>
                <input
                    type="text"
                    name="access_keys"
                    value={examination.access_keys}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Started At</label>
                <input
                    type="datetime-local"
                    name="started_at"
                    value={new Date(examination.started_at)
                        .toISOString()
                        .slice(0, 16)}
                    onChange={(e) =>
                        handleChange({
                            target: {
                                name: 'started_at',
                                value: new Date(e.target.value).toISOString(),
                            },
                        })
                    }
                />
            </div>
            <div>
                <label>Created By</label>
                <input
                    type="text"
                    name="created_by"
                    value={examination.created_by}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Total Score</label>
                <input
                    type="number"
                    name="total_score"
                    value={examination.total_score}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    )
}

export default ExaminationForm
