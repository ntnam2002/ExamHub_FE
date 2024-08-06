// components/ExaminationTable.tsx
import React, { useState, useEffect, useMemo } from 'react'
import { Examination } from '@/types'
import {
    apiGetExaminations,
    apiDeleteExamination,
} from '@/services/ExamService'
import DataTable from '@/components/shared/DataTable'
import ExaminationForm from './ExaminationForm'
import ExaminationTableTools from './ExaminationTableTools'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { Modal } from 'antd'

const ExaminationTable: React.FC = () => {
    const [data, setData] = useState<Examination[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedExamination, setSelectedExamination] =
        useState<Examination | null>(null)

    useEffect(() => {
        apiGetExaminations()
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
                header: 'Exam Name',
                accessorKey: 'exam_id.exam_name',
                cell: (props: { row: { original: any } }) => (
                    <span>{props.row.original.exam_id.exam_name}</span>
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
        setSelectedExamination(examination)
    }

    const handleDelete = (id: string) => {
        apiDeleteExamination(id)
            .then(() => {
                setData((prevData) =>
                    prevData.filter((item) => item._id !== id)
                )
            })
            .catch((error) => console.error(error))
    }

    return (
        <div>
            <ExaminationTableTools onEdit={handleEdit} />
            <div>&nbsp;</div>
            <DataTable columns={columns} data={data} loading={loading} />
            <Modal
                title={selectedExamination ? 'Cập nhật kỳ thi' : 'Tạo kỳ thi'}
                open={!!selectedExamination}
                onCancel={() => setSelectedExamination(null)}
                onOk={() => setSelectedExamination(null)}
            >
                {selectedExamination && (
                    <ExaminationForm
                        examinationToEdit={selectedExamination}
                        onSave={() => setSelectedExamination(null)}
                        onCancel={() => setSelectedExamination(null)}
                    />
                )}
            </Modal>
        </div>
    )
}

export default ExaminationTable
