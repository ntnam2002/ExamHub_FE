import React, { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import DataTable from '@/components/shared/DataTable' // Thay đổi đường dẫn nếu cần
import { Exam } from './types'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import dayjs from 'dayjs'
import { apiGetExams } from '@/services/ExamService'

interface ExamTableProps {
    onEdit: (exam: Exam) => void
    onDelete: (id: string) => void
}

const ExamTable: React.FC<ExamTableProps> = ({ onEdit, onDelete }) => {
    const [data, setData] = useState<Exam[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        apiGetExams()
            .then((response) => {
                setData(response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.error(error)
                setLoading(false)
            })
    }, [])

    const columns = useMemo(
        () => [
            {
                header: 'ID',
                accessorKey: '_id',
            },
            {
                header: 'Tên đề thi',
                accessorKey: 'exam_name',
            },
            {
                header: 'Mô tả',
                accessorKey: 'description',
            },
            {
                header: 'Thời gian',
                accessorKey: 'duration_minutes',
            },
            {
                header: '',
                id: 'action',
                cell: (props: { row: { original: Exam } }) => (
                    <div className="flex justify-end text-lg">
                        <span
                            className="cursor-pointer p-2 hover:text-blue-500"
                            onClick={() => onEdit(props.row.original)}
                        >
                            <HiOutlinePencil />
                        </span>
                        <span
                            className="cursor-pointer p-2 hover:text-red-500"
                            onClick={() => onDelete(props.row.original._id)}
                        >
                            <HiOutlineTrash />
                        </span>
                    </div>
                ),
            },
        ],
        [onEdit, onDelete]
    )

    return (
        <DataTable
            columns={columns}
            data={data}
            loading={loading}
            // Thêm các thuộc tính khác của DataTable nếu cần
        />
    )
}

export default ExamTable
