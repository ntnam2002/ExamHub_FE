import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import { Exam } from './types'

interface ExamFormProps {
    examToEdit?: Exam
    onSave: () => void
    onCancel: () => void
}

const ExamForm: React.FC<ExamFormProps> = ({
    examToEdit,
    onSave,
    onCancel,
}) => {
    const [exam, setExam] = useState<Exam>({
        _id: '',
        exam_name: '',
        description: '',
        duration_minutes: 0,
    })

    useEffect(() => {
        if (examToEdit) {
            setExam(examToEdit)
        }
    }, [examToEdit])

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setExam((prevExam) => ({ ...prevExam, [name]: value }))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const request = examToEdit
            ? axios.put(`/api/exams/${examToEdit._id}`, exam)
            : axios.post('/api/exams', exam)

        request.then(() => onSave()).catch((error) => console.error(error))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Exam Name</label>
                <input
                    type="text"
                    name="exam_name"
                    value={exam.exam_name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Description</label>
                <textarea
                    name="description"
                    value={exam.description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Duration (minutes)</label>
                <input
                    type="number"
                    name="duration_minutes"
                    value={exam.duration_minutes}
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

export default ExamForm
