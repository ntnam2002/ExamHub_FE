import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ExamTable from './ExamTable'
import axios from 'axios'
import { Exam } from './types'
import { message } from 'antd'
import appConfig from '@/configs/app.config'

const ExamLists: React.FC = () => {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const [examToDelete, setExamToDelete] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleEdit = useCallback(
        (exam: Exam) => {
            navigate(`/admin/exam/edit/${exam._id}`)
        },
        [navigate]
    )

    const handleAdd = useCallback(() => {
        navigate('/admin/exam/create')
    }, [navigate])

    const handleDelete = useCallback((examId: string) => {
        setExamToDelete(examId)
        setShowDeleteModal(true)
    }, [])

    const handleConfirmDelete = useCallback(async () => {
        if (examToDelete) {
            try {
                await axios.delete(
                    `${appConfig.apiPrefix}exams/${examToDelete}`
                )
                message.success('Xóa đề thi thành công')
                setExamToDelete(null)
                setShowDeleteModal(false)

                // Trigger a refresh of the exam list
                // You might need to pass a refresh function from a parent component
                // or use a state management solution like Redux
            } catch (error) {
                console.error('Lỗi khi xóa đề thi:', error)
                message.error('Xóa đề thi thất bại')
            }
        }
    }, [examToDelete])

    const handleCancelDelete = useCallback(() => {
        setShowDeleteModal(false)
        setExamToDelete(null)
    }, [])

    return (
        <div>
            <ExamTable
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            {/* <ConfirmDeleteModal
                show={showDeleteModal}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            /> */}
        </div>
    )
}

export default ExamLists
