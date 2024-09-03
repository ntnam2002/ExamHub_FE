import React, { useState, useEffect } from 'react'
import { Examination } from './types'
import { Form, Input, Button, DatePicker, Select, Space, message } from 'antd'
import moment from 'moment'
import {
    apiGetExams,
    apiGetAllClasses,
    apiCreateExamination,
    apiUpdateExamination,
} from '@/services/ExamService'

const { Option } = Select

interface ExaminationFormProps {
    examinationToEdit?: Examination | null
    onCancel: () => void
    onSave: (examination: Examination) => void
}

const ExaminationForm: React.FC<ExaminationFormProps> = ({
    examinationToEdit,
    onCancel,
    onSave,
}) => {
    const [form] = Form.useForm()
    const [exams, setExams] = useState<{ _id: string; exam_name: string }[]>([])
    const [classes, setClasses] = useState<
        { _id: string; class_name: string }[]
    >([])
    const [isSubmitting, setIsSubmitting] = useState(false)

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
            form.setFieldsValue({
                ...examinationToEdit,
                started_at: moment(examinationToEdit.started_at),
                student_id: examinationToEdit.student_id
                    ? examinationToEdit.student_id.join(', ')
                    : '',
            })
        } else {
            form.resetFields()
        }
    }, [examinationToEdit, form])

    const handleSave = async (values: any) => {
        if (isSubmitting) return
        setIsSubmitting(true)
        try {
            const examData = {
                ...values,
                student_id: values.student_id
                    ? values.student_id
                          .split(',')
                          .map((id: string) => id.trim())
                    : [],
                started_at: values.started_at.toDate(),
            }
            let response
            if (examinationToEdit) {
                response = await apiUpdateExamination(
                    examinationToEdit._id,
                    examData
                )
                message.success('Examination updated successfully')
            } else {
                response = await apiCreateExamination(examData)
                message.success('Examination created successfully')
            }
            onSave(response.data)
        } catch (error) {
            console.error(error)
            message.error('An error occurred while saving the examination')
        } finally {
            setIsSubmitting(false)
        }
    }

    const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } }

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <Form
                form={form}
                {...formItemLayout}
                layout="horizontal"
                onFinish={handleSave}
            >
                <Form.Item
                    label="Exam ID"
                    name="exam_id"
                    rules={[
                        { required: true, message: 'Please select an exam' },
                    ]}
                >
                    <Select>
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
                    rules={[
                        {
                            required: true,
                            message: 'Please select at least one class',
                        },
                    ]}
                >
                    <Select mode="multiple">
                        {classes.map((cls) => (
                            <Option key={cls._id} value={cls._id}>
                                {cls.class_name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Student IDs" name="student_id">
                    <Input />
                </Form.Item>
                <Form.Item label="Access Keys" name="access_keys">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Started At"
                    name="started_at"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a start time',
                        },
                    ]}
                >
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>
                <Form.Item
                    wrapperCol={{ span: 24 }}
                    style={{ textAlign: 'right' }}
                >
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? 'Saving...'
                                : examinationToEdit
                                ? 'Update'
                                : 'Create'}
                        </Button>
                        <Button onClick={onCancel}>Cancel</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ExaminationForm
