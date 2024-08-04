import React, { useState } from 'react'
import ExamTable from './ExamTable'
import ExamForm from './ExamForm'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import axios from 'axios'
import { Exam } from './types'

const ExamLists: React.FC = () => {
    const [editingExam, setEditingExam] = useState<Exam | undefined>(undefined)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const [examToDelete, setExamToDelete] = useState<string | null>(null)

    const handleEdit = (exam: Exam) => {
        setEditingExam(exam)
    }

    const handleDelete = (examId: string) => {
        setExamToDelete(examId)
        setShowDeleteModal(true)
    }

    const handleSave = () => {
        setEditingExam(undefined)
    }

    const handleCancel = () => {
        setEditingExam(undefined)
    }

    const handleConfirmDelete = () => {
        if (examToDelete) {
            axios
                .delete(`/api/exams/${examToDelete}`)
                .then(() => {
                    setExamToDelete(null)
                    setShowDeleteModal(false)
                })
                .catch((error) => console.error(error))
        }
    }

    const handleCancelDelete = () => {
        setShowDeleteModal(false)
    }

    return (
        <div>
            <ExamTable onEdit={handleEdit} onDelete={handleDelete} />
            {/* <ExamForm
                examToEdit={editingExam}
                onSave={handleSave}
                onCancel={handleCancel}
            /> */}
            <ConfirmDeleteModal
                show={showDeleteModal}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    )
}

export default ExamLists
