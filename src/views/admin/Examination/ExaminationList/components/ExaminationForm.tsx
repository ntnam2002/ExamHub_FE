// components/ExaminationForm.tsx
import React, { useState, useEffect, ChangeEvent } from 'react'
import { Examination } from './types'
import { Form, Input, Button, DatePicker, Select, Space } from 'antd'
import moment from 'moment'
import {
    apiGetExams,
    apiGetAllClasses,
    apiCreateExamination,
    apiGetExaminations,
} from '@/services/ExamService'

const { Option } = Select

interface ExaminationFormProps {
    examinationToEdit?: Examination
    onSave: (examination: Examination) => void
    onCancel: () => void
}

const ExaminationForm: React.FC<ExaminationFormProps> = ({
    examinationToEdit,
    onSave,
    onCancel,
}) => {
    const [examination, setExamination] = useState<any>({
        //_id: '',
        exam_id: '',
        class_id: [],
        student_id: [],
        access_keys: '',
        started_at: new Date(),
        //created_by: '',
        //total_score: 0,
    })
    
    const [exams, setExams] = useState<{ _id: string; exam_name: string }[]>([])
    const [classes, setClasses] = useState<
        { _id: string; class_name: string }[]
    >([])

    useEffect(() => {
        apiGetExams()
            .then((response) => setExams(response.data))
            .catch((error) => console.error(error))

        apiGetAllClasses()
            .then((response) => setClasses(response.data))
            .catch((error) => console.error(error))
    }, [])

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
    const handleSave = () => {
       
        apiCreateExamination(examination)
            .then((response) => {
                onSave(response.data)
            })
            .catch((error) => console.error(error))
        apiGetExaminations()
    }
    const handleSubmit = () => {
        onSave(examination)
    }
    const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } }

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <Form
                {...formItemLayout}
                layout="horizontal"
                initialValues={{
                    exam_id: examination._id,
                    class_id: examination.class_id,
                    student_id: examination.student_id.join(', '),
                    access_keys: examination.access_keys,
                    started_at: moment(examination.started_at),
                    //created_by: examination.created_by,
                    //total_score: examination.total_score,
                }}
                onFinish={handleSubmit}
            >
                <Form.Item label="Exam ID" name="exam_id" {...formItemLayout}>
                    <Select
                        value={examination.exam_id}
                        onChange={(value) =>
                            setExamination((prev) => ({
                                ...prev,
                                exam_id: value,
                            }))
                        }
                    >
                        {exams.map((exam) => (
                            <Option key={exam._id} value={exam._id}>
                                {exam.exam_name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Class IDs"
                    name="class_id"
                    {...formItemLayout}
                >
                    <Select
                        mode="multiple"
                        value={examination.class_id}
                        onChange={(values) =>
                            setExamination((prev) => ({
                                ...prev,
                                class_id: values,
                            }))
                        }
                    >
                        {classes.map((cls) => (
                            <Option key={cls._id} value={cls._id}>
                                {cls.class_name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Student IDs"
                    name="student_id"
                    {...formItemLayout}
                >
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
                <Form.Item
                    label="Access Keys"
                    name="access_keys"
                    {...formItemLayout}
                >
                    <Input
                        type="text"
                        name="access_keys"
                        value={examination.access_keys}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item
                    label="Started At"
                    name="started_at"
                    {...formItemLayout}
                >
                    <DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        value={moment(examination.started_at)}
                        onChange={handleDateChange}
                    />
                </Form.Item>
                {/* <Form.Item
                    label="Created By"
                    name="created_by"
                    {...formItemLayout}
                >
                    <Input
                        type="text"
                        name="created_by"
                        value={examination.created_by}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item
                    label="Total Score"
                    name="total_score"
                    {...formItemLayout}
                >
                    <Input
                        type="number"
                        name="total_score"
                        value={examination.total_score}
                        onChange={handleChange}
                    />
                </Form.Item> */}
                <Form.Item
                    wrapperCol={{ span: 24 }}
                    style={{ textAlign: 'right' }}
                >
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        <Button onClick={onCancel}>Cancel</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ExaminationForm
