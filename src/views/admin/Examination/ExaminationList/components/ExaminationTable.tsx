import React, { useState, useEffect, useMemo } from 'react'
import { Examination } from './types'
import {
    apiGetExaminations,
    apiDeleteExamination,
} from '@/services/ExamService'
import DataTable from '@/components/shared/DataTable'
import ExaminationForm from './ExaminationForm'
import ExaminationTableTools from './ExaminationTableTools'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { Modal, message } from 'antd'

const ExaminationTable: React.FC = () => {
    const [data, setData] = useState<Examination[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedExamination, setSelectedExamination] =
        useState<Examination | null>(null)
    const [pageIndex, setPageIndex] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    const [sort, setSort] = useState<any>(null)
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    const fetchExaminations = () => {
        setLoading(true)
        apiGetExaminations()
            .then((response) => {
                setData(response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.error(error)
                setLoading(false)
                message.error('Failed to fetch examinations')
            })
    }

    useEffect(() => {
        fetchExaminations()
    }, [pageIndex, pageSize, sort])

    const onPaginationChange = (page: number) => {
        setPageIndex(page)
    }

    const onSelectChange = (value: number) => {
        setPageSize(Number(value))
        setPageIndex(1)
    }

    const onSort = (sort: any) => {
        setSort(sort)
    }

    const columns = useMemo(
        () => [
            {
                header: 'Tên bài thi',
                accessorKey: 'exam_id.exam_name',
                cell: (props: { row: { original: any } }) => (
                    <span>{props.row.original.exam_id.exam_name}</span>
                ),
            },
            {
                header: 'Bắt đầu lúc',
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
                header: 'Tổng điểm',
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
        setIsModalVisible(true)
    }

    const handleDelete = (id: string) => {
        apiDeleteExamination(id)
            .then(() => {
                fetchExaminations()
                message.success('Examination deleted successfully')
            })
            .catch((error) => {
                console.error(error)
                message.error(
                    'An error occurred while deleting the examination'
                )
            })
    }

    const handleSave = (updatedExamination: Examination) => {
        fetchExaminations()
        setIsModalVisible(false)
        setSelectedExamination(null)
    }

    return (
        <div>
            <ExaminationTableTools
                onEdit={() => {
                    setSelectedExamination(null)
                    setIsModalVisible(true)
                }}
            />
            <div>&nbsp;</div>
            <DataTable
                columns={columns}
                data={data}
                loading={loading}
                pagingData={{
                    total: data?.total,
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <Modal
                title={
                    selectedExamination
                        ? 'Edit Examination'
                        : 'Create Examination'
                }
                open={isModalVisible}
                footer={null}
                onCancel={() => {
                    setIsModalVisible(false)
                    setSelectedExamination(null)
                }}
            >
                <ExaminationForm
                    examinationToEdit={selectedExamination}
                    onCancel={() => {
                        setIsModalVisible(false)
                        setSelectedExamination(null)
                    }}
                    onSave={handleSave}
                />
            </Modal>
        </div>
    )
}

export default ExaminationTable
