import React, { useEffect, useMemo, useState, useCallback } from 'react'
import DataTable from '@/components/shared/DataTable'
import { Exam } from './types'
import {
    HiOutlinePencil,
    HiOutlineTrash,
    HiOutlinePlusCircle,
    HiOutlineEye,
} from 'react-icons/hi'
import { apiGetExams } from '@/services/ExamService'
import ExamTableTools from './ExamTableTools'
import { Modal, Button } from 'antd'

interface ExamTableProps {
    onAdd: () => void
    onEdit: (exam: Exam) => void
    onDelete: (id: string) => void
}

const ExamTable: React.FC<ExamTableProps> = ({ onAdd, onEdit, onDelete }) => {
    const [data, setData] = useState<Exam[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    const fetchExams = useCallback(async () => {
        try {
            setLoading(true)
            const response = await apiGetExams()
            setData(response.data)
        } catch (error) {
            console.error('Error fetching exams:', error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchExams()
    }, [fetchExams])

    const handleDetail = useCallback((exam: Exam) => {
        setSelectedExam(exam)
        setIsModalVisible(true)
    }, [])

    const handleEdit = useCallback(
        (exam: Exam) => {
            onEdit(exam)
        },
        [onEdit]
    )

    const handleDelete = useCallback(
        (id: string) => {
            onDelete(id)
        },
        [onDelete]
    )

    const handleModalClose = () => {
        setIsModalVisible(false)
        setSelectedExam(null)
    }

    const columns = useMemo(
        () => [
            {
                header: 'Tên đề thi',
                accessorKey: 'exam_name',
            },
            {
                header: 'Mô tả',
                accessorKey: 'description',
                cell: ({ row }: { row: { original: Exam } }) => (
                    <div className="max-w-xs truncate">
                        {row.original.description}
                    </div>
                ),
            },
            {
                header: 'Thời gian (phút)',
                accessorKey: 'duration_minutes',
            },
            {
                header: 'Số câu hỏi',
                accessorKey: 'questions',
                cell: ({ row }: { row: { original: Exam } }) =>
                    row.original.questions.length,
            },
            {
                header: '',
                id: 'action',
                cell: ({ row }: { row: { original: Exam } }) => (
                    <div className="flex justify-end text-lg">
                        <button
                            className="p-2 hover:text-blue-500 transition-colors"
                            aria-label="View Details"
                            onClick={() => handleDetail(row.original)}
                        >
                            <HiOutlineEye />
                        </button>
                        <button
                            className="p-2 hover:text-blue-500 transition-colors"
                            aria-label="Edit"
                            onClick={() => handleEdit(row.original)}
                        >
                            <HiOutlinePencil />
                        </button>
                        <button
                            className="p-2 hover:text-red-500 transition-colors"
                            aria-label="Delete"
                            onClick={() => handleDelete(row.original._id)}
                        >
                            <HiOutlineTrash />
                        </button>
                    </div>
                ),
            },
        ],
        [handleDetail, handleEdit, handleDelete]
    )

    return (
        <div>
            <Modal
                title={selectedExam?.exam_name}
                visible={isModalVisible}
                footer={[
                    <Button key="close" onClick={handleModalClose}>
                        Đóng
                    </Button>,
                ]}
                onCancel={handleModalClose}
            >
                {selectedExam && (
                    <div>
                        <p>
                            <strong>Mô tả:</strong> {selectedExam.description}
                        </p>
                        <p>
                            <strong>Thời gian:</strong>{' '}
                            {selectedExam.duration_minutes} phút
                        </p>
                        <p>
                            <strong>Số câu hỏi:</strong>{' '}
                            {selectedExam.questions.length}
                        </p>
                        <ul>
                            {selectedExam.questions.map((q, index) => (
                                <li key={index}>{q.text}</li>
                            ))}
                        </ul>
                        <p>
                            <strong>Ngày tạo:</strong>{' '}
                            {new Date(selectedExam.created_at).toLocaleString()}
                        </p>
                    </div>
                )}
            </Modal>

            <ExamTableTools onExamChange={fetchExams} />
            <DataTable columns={columns} data={data} loading={loading} />
        </div>
    )
}

export default ExamTable
