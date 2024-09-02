import React, { useEffect, useMemo, useState, useCallback } from 'react'
import DataTable from '@/components/shared/DataTable'
import { Exam } from './types'
import {
    HiOutlinePencil,
    HiOutlineTrash,
    HiOutlinePlusCircle,
} from 'react-icons/hi'
import { apiGetExams } from '@/services/ExamService'
import ExamTableTools from './ExamTableTools'

interface ExamTableProps {
    onAdd: () => void
    onEdit: (exam: Exam) => void
    onDelete: (id: string) => void
}

const ExamTable: React.FC<ExamTableProps> = ({ onAdd, onEdit, onDelete }) => {
    const [data, setData] = useState<Exam[]>([])
    const [loading, setLoading] = useState<boolean>(true)

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

    const handleAdd = useCallback(() => {
        onAdd()
    }, [onAdd])

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
        [handleEdit, handleDelete]
    )

    return (
        <div>
            <ExamTableTools onExamChange={fetchExams} />
            <DataTable
                pagination
                sortable
                columns={columns}
                data={data}
                loading={loading}
            />
        </div>
    )
}

export default ExamTable
