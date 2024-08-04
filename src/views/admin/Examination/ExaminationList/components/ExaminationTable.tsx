import React, { useEffect, useMemo, useState } from 'react'
// Thay đổi đường dẫn nếu cần
import DataTable from '@/components/shared/DataTable' // Thay đổi đường dẫn nếu cần
import { Examination } from './types' // Thay đổi đường dẫn nếu cần
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import {
    apiDeleteExamination,
    apiGetExaminations,
} from '@/services/ExamService'

const ExaminationTable: React.FC = () => {
    const [data, setData] = useState<Examination[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        apiGetExaminations()
            .then((response) => {
                console.log(response.data)
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
                header: 'Exam Name',
                accessorKey: 'exam_id.exam_name',
                cell: (props: { row: { original: any } }) => (
                    <span>{props.row.original.exam_id.exam_name}</span>
                ),
            },
            {
                header: 'Question IDs',
                accessorKey: 'question_id',
                cell: (props: { row: { original: any } }) => (
                    <span>{props.row.original.question_id.join(', ')}</span>
                ),
            },
            
            {
                header: 'Access Keys',
                accessorKey: 'access_keys',
            },
            {
                header: 'Started At',
                accessorKey: 'started_at',
                cell: (props: { row: { original: any } }) => (
                    <span>
                        {new Date(
                            props.row.original.started_at
                        ).toLocaleString()}
                    </span>
                ),
            },
            {
                header: 'Created By',
                accessorKey: 'created_by',
            },
            {
                header: 'Total Score',
                accessorKey: 'total_score',
            },
            {
                header: '',
                id: 'action',
                cell: (props: { row: { original: any } }) => (
                    <div className="flex justify-end text-lg">
                        <span
                            className="cursor-pointer p-2 hover:text-blue-500"
                            onClick={() => handleEdit(props.row.original)}
                        >
                            <HiOutlinePencil />
                        </span>
                        <span
                            className="cursor-pointer p-2 hover:text-red-500"
                            onClick={() => handleDelete(props.row.original._id)}
                        >
                            <HiOutlineTrash />
                        </span>
                    </div>
                ),
            },
        ],
        []
    )

    const handleEdit = (examination: Examination) => {
        // Edit logic here
    }

    const handleDelete = (id: string) => {
        apiDeleteExamination(id)
            .then(() => {
                setData(data.filter((exam) => exam._id !== id))
            })
            .catch((error) => console.error(error))
    }

    return <DataTable columns={columns} data={data} loading={loading} />
}

export default ExaminationTable
