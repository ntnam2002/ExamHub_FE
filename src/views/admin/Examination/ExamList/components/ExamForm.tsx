import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
    Form,
    Input,
    InputNumber,
    Button,
    Card,
    Checkbox,
    Space,
    message,
    Alert,
    Typography,
    Radio,
} from 'antd'
import { Exam, Question } from './types'
import appConfig from '@/configs/app.config'

const { TextArea } = Input
const { Title } = Typography

interface ExamFormProps {
    onSave?: () => void
}

const ExamForm: React.FC<ExamFormProps> = ({ onSave }) => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [form] = Form.useForm()

    const [allQuestions, setAllQuestions] = useState<Question[]>([])
    const [selectedQuestions, setSelectedQuestions] = useState<string[]>([])
    const [selectionMode, setSelectionMode] = useState<'manual' | 'random'>(
        'manual'
    )
    const [randomCount, setRandomCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchExamData = async () => {
            if (!id) return
            setIsLoading(true)
            try {
                const response = await axios.get<Exam>(
                    `${appConfig.apiPrefix}exams/${id}`
                )
                form.setFieldsValue(response.data.data)
                setSelectedQuestions(
                    response.data.data.questions.map((q) => q._id)
                )
            } catch (err) {
                setError('Lỗi khi lấy dữ liệu bài thi. Vui lòng thử lại.')
                console.error('Lỗi khi lấy dữ liệu bài thi:', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchExamData()
    }, [id, form])

    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoading(true)
            try {
                console.log(appConfig.apiPrefix)
                const response = await axios.get<{ data: Question[] }>(
                    `${appConfig.apiPrefix}exams/allquestions`
                )
                setAllQuestions(response.data.data)
            } catch (err) {
                setError('Lỗi khi lấy dữ liệu câu hỏi. Vui lòng thử lại.')
                console.error('Lỗi khi lấy dữ liệu câu hỏi:', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchQuestions()
    }, [])

    const handleSubmit = async (values: any) => {
        setIsLoading(true)
        setError(null)

        const examData = {
            ...values,
            questions: selectedQuestions,
        }

        try {
            if (id) {
                await axios.put(`${appConfig.apiPrefix}exams/${id}`, examData)
            } else {
                await axios.post(`${appConfig.apiPrefix}exams`, examData)
            }
            message.success('Lưu bài thi thành công')
            onSave?.()
            navigate('/admin/exam')
        } catch (err) {
            setError('Lỗi khi lưu bài thi. Vui lòng thử lại.')
            console.error('Lỗi khi lưu bài thi:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const toggleQuestionSelection = (questionId: string) => {
        if (selectionMode === 'random') return
        setSelectedQuestions((prev) =>
            prev.includes(questionId)
                ? prev.filter((id) => id !== questionId)
                : [...prev, questionId]
        )
    }

    const handleRandomSelection = () => {
        if (selectionMode !== 'random' || randomCount <= 0) return
        const shuffled = [...allQuestions].sort(() => 0.5 - Math.random())
        setSelectedQuestions(shuffled.slice(0, randomCount).map((q) => q._id))
    }

    const handleSelectionModeChange = (e: any) => {
        const mode = e.target.value
        setSelectionMode(mode)
        if (mode === 'random') {
            setSelectedQuestions([])
        } else {
            setRandomCount(0)
        }
    }

    if (isLoading) return <div className="text-center py-4">Đang tải...</div>

    return (
        <Card
            title={
                <Title level={2}>
                    {id ? 'Sửa bài thi' : 'Tạo bài thi mới'}
                </Title>
            }
        >
            {error && (
                <Alert
                    showIcon
                    message={error}
                    type="error"
                    style={{ marginBottom: 16 }}
                />
            )}
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    name="exam_name"
                    label="Tên bài kiểm tra"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên bài kiểm tra!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Mô tả">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name="duration_minutes"
                    label="Thời gian (phút)"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập thời gian!',
                        },
                    ]}
                >
                    <InputNumber min={1} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Chọn câu hỏi">
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Radio.Group
                            value={selectionMode}
                            onChange={handleSelectionModeChange}
                        >
                            <Radio value="manual">Chọn thủ công</Radio>
                            <Radio value="random">Chọn ngẫu nhiên</Radio>
                        </Radio.Group>
                        {selectionMode === 'random' && (
                            <Space>
                                <InputNumber
                                    min={1}
                                    max={allQuestions.length}
                                    value={randomCount}
                                    style={{ width: 100 }}
                                    onChange={setRandomCount}
                                />
                                <Button onClick={handleRandomSelection}>
                                    Chọn ngẫu nhiên
                                </Button>
                            </Space>
                        )}
                        <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                            {allQuestions.map((question) => (
                                <div key={question._id}>
                                    <Checkbox
                                        checked={selectedQuestions.includes(
                                            question._id
                                        )}
                                        disabled={selectionMode === 'random'}
                                        onChange={() =>
                                            toggleQuestionSelection(
                                                question._id
                                            )
                                        }
                                    >
                                        {question.text}
                                    </Checkbox>
                                </div>
                            ))}
                        </div>
                    </Space>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                        >
                            {isLoading ? 'Đang lưu...' : 'Lưu'}
                        </Button>
                        <Button onClick={() => navigate('/admin/exam')}>
                            Hủy
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default ExamForm
