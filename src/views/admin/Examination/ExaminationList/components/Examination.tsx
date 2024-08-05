import React, { useState, useEffect, ChangeEvent, useMemo } from 'react'
import { Examination } from './types'
import {
    apiCreateExamination,
    apiUpdateExamination,
    apiGetExaminations,
    apiDeleteExamination,
} from '@/services/ExamService'
import { Form, Input, Button, DatePicker, Modal } from 'antd'
import moment from 'moment'
import DataTable from '@/components/shared/DataTable'
import {
    HiOutlinePencil,
    HiOutlineTrash,
    HiDownload,
    HiPlusCircle,
} from 'react-icons/hi'
import { Link } from 'react-router-dom'

// ExaminationForm Component
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setExamination((prevExam) => ({ ...prevExam, [name]: value }))
    }

    const handleDateChange = (date: moment.Moment | null) => {
        setExamination((prevExam) => ({
            ...prevExam,
            started_at: date ? date.toDate() : new Date(),
        }))
    }

    const handleSubmit = () => {
        if (examination._id) {
            apiUpdateExamination(examination._id, examination)
                .then(() => onSave())
                .catch((error) => console.error(error))
        } else {
            apiCreateExamination(examination)
                .then(() => onSave())
                .catch((error) => console.error(error))
        }
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Form
                layout="horizontal"
                initialValues={{
                    exam_id: examination.exam_id,
                    class_id: examination.class_id.join(', '),
                    student_id: examination.student_id.join(', '),
                    access_keys: examination.access_keys,
                    started_at: moment(examination.started_at),
                    created_by: examination.created_by,
                    total_score: examination.total_score,
                }}
                onFinish={handleSubmit}
            >
                <Form.Item label="Exam ID" name="exam_id">
                    <Input
                        type="text"
                        name="exam_id"
                        value={examination.exam_id}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item label="Class IDs" name="class_id">
                    <Input
                        type="text"
                        name="class_id"
                        value={examination.class_id.join(', ')}
                        onChange={(e) =>
                            setExamination((prevExam) => ({
                                ...prevExam,
                                class_id: e.target.value
                                    .split(',')
                                    .map((id) => id.trim()),
                            }))
                        }
                    />
                </Form.Item>
                <Form.Item label="Student IDs" name="student_id">
                    <Input
                        type="text"
                        name="student_id"
                        value={examination.student_id.join(', ')}
                        onChange={(e) =>
                            setExamination((prevExam) => ({
                                ...prevExam,
                                student_id: e.target.value
                                    .split(',')
                                    .map((id) => id.trim()),
                            }))
                        }
                    />
                </Form.Item>
                <Form.Item label="Access Keys" name="access_keys">
                    <Input
                        type="text"
                        name="access_keys"
                        value={examination.access_keys}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item label="Started At" name="started_at">
                    <DatePicker
                        format="YYYY-MM-DD"
                        value={moment(examination.started_at)}
                        onChange={handleDateChange}
                    />
                </Form.Item>
                <Form.Item label="Created By" name="created_by">
                    <Input
                        type="text"
                        name="created_by"
                        value={examination.created_by}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item label="Total Score" name="total_score">
                    <Input
                        type="number"
                        name="total_score"
                        value={examination.total_score}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                    <Button
                        type="default"
                        style={{ marginLeft: '8px' }}
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

// ExaminationTableTools Component
interface ExaminationTableToolsProps {
    onEdit: (examination: Examination) => void
}

const ExaminationTableTools: React.FC<ExaminationTableToolsProps> = ({
    onEdit,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedExamination, setSelectedExamination] =
        useState<Examination | null>(null)

    const handleAddExamination = () => {
        setSelectedExamination(null)
        setIsModalVisible(true)
    }

    const handleCloseModal = () => {
        setIsModalVisible(false)
        setSelectedExamination(null)
    }

    const handleSubmit = async (examination: Examination) => {
        try {
            if (selectedExamination) {
                await apiUpdateExamination(selectedExamination._id, examination)
            } else {
                await apiCreateExamination(examination)
            }

            handleCloseModal()
        } catch (error) {
            console.error(`Error updating examination: ${error}`)
        }
    }

    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/question-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Xuất file
                </Button>
            </Link>
            <Button
                block
                variant="solid"
                size="sm"
                icon={<HiPlusCircle />}
                onClick={handleAddExamination}
            >
                Tạo kỳ thi
            </Button>
            <Modal
                title={selectedExamination ? 'Cập nhật kỳ thi' : 'Tạo kỳ thi'}
                open={isModalVisible}
                onCancel={handleCloseModal}
                onOk={() => handleSubmit(selectedExamination!)}
            >
                <ExaminationForm
                    examinationToEdit={selectedExamination!}
                    onSave={handleCloseModal}
                    onCancel={handleCloseModal}
                />
            </Modal>
        </div>
    )
}

// ExaminationTable Component
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
                accessorKey: 'exam_id',
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
        // Open the modal or form for editing
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
