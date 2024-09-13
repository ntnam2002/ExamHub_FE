import React, { useState, useEffect } from 'react'
import {
    Table,
    Input,
    Space,
    DatePicker,
    InputNumber,
    Button,
    message,
} from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import axios from 'axios'
import moment from 'moment'
import appConfig from '@/configs/app.config'

const StudentResultsTable = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useState({
        examination_name: '',
        score: null,
        submitted_at: null,
    })
    function decodeJWT(getNameFromLocalStorage: string | null) {
        if (getNameFromLocalStorage) {
            const base64Url = getNameFromLocalStorage.split('.')[1]
            const base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/')
            if (!base64) return null
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(function (c) {
                        return (
                            '%' +
                            ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                        )
                    })
                    .join('')
            )

            return JSON.parse(jsonPayload)
        }
        return null
    }
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            if (filters.examination_name)
                params.append('examination_name', filters.examination_name)
            if (filters.score !== null)
                params.append('score', filters.score.toString())
            if (filters.submitted_at)
                params.append(
                    'submitted_at',
                    filters.submitted_at.format('YYYY-MM-DD')
                )

            const getNameFromLocalStorage = localStorage.getItem('admin')
            const decodedJWT = decodeJWT(getNameFromLocalStorage)
            const student_id = decodedJWT ? decodedJWT._id : ''
            const response = await axios.get(
                `${
                    appConfig.apiPrefix
                }management/getResult/${student_id}?${params.toString()}`
            )
            if (response.data.status === 'success') {
                setData(
                    response.data.data.map((item) => ({
                        ...item,
                        key: item._id,
                    }))
                )
            } else {
                message.error('Failed to fetch data')
            }
        } catch (error) {
            console.error('Error fetching data:', error)
            message.error('An error occurred while fetching data')
        } finally {
            setLoading(false)
        }
    }

    const columns = [
        {
            title: 'Tên Bài Thi',
            dataIndex: 'examination_name',
            key: 'examination_name',
        },
        {
            title: 'Mã Sinh Viên',
            dataIndex: 'student_id',
            key: 'student_id',
        },
        {
            title: 'Điểm',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Thời Gian Nộp',
            dataIndex: 'submitted_at',
            key: 'submitted_at',
            render: (text) => new Date(text).toLocaleString(),
        },
    ]

    const handleSearch = () => {
        fetchData()
    }

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
                <Input
                    placeholder="Tên bài thi"
                    value={filters.examination_name}
                    style={{ width: 200 }}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            examination_name: e.target.value,
                        })
                    }
                />
                <InputNumber
                    placeholder="Điểm"
                    value={filters.score}
                    style={{ width: 100 }}
                    onChange={(value) =>
                        setFilters({ ...filters, score: value })
                    }
                />
                <DatePicker
                    placeholder="Ngày nộp"
                    value={filters.submitted_at}
                    onChange={(date) =>
                        setFilters({ ...filters, submitted_at: date })
                    }
                />
                <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    onClick={handleSearch}
                >
                    Tìm kiếm
                </Button>
            </Space>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={{ pageSize: 10 }}
            />
        </Space>
    )
}

export default StudentResultsTable
