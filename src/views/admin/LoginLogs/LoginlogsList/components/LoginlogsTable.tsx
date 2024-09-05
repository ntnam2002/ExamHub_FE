import React, { useEffect, useState } from 'react'
import { Table, Input, Space } from 'antd'
import {
    apiGetAllLoginLogs,
    apiSearchSystemLog,
} from '@/services/managementService'

const { Search } = Input

const LoginlogsTable: React.FC = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState<boolean>(true)
    const [pageIndex, setPageIndex] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    const [total, setTotal] = useState<number>(0)
    const [searchQuery, setSearchQuery] = useState<string>('')

    const fetchLoginLogs = (page: number, size: number, query: string) => {
        setLoading(true)
        if (query) {
            apiSearchSystemLog(query)
                .then((response) => {
                    setData(response.data)
                    setTotal(response.data.length)
                    setLoading(false)
                })
                .catch((error) => {
                    console.error(error)
                    setLoading(false)
                })
        } else {
            apiGetAllLoginLogs({ page, size })
                .then((response) => {
                    setData(response.data.filteredResult)
                    setTotal(response.data.totalItems)
                    setLoading(false)
                })
                .catch((error) => {
                    console.error(error)
                    setLoading(false)
                })
        }
    }

    useEffect(() => {
        fetchLoginLogs(pageIndex, pageSize, searchQuery)
    }, [pageIndex, pageSize, searchQuery])

    const onPaginationChange = (page: number, pageSize?: number) => {
        setPageIndex(page)
        if (pageSize) {
            setPageSize(pageSize)
        }
    }

    const onSearch = (value: string) => {
        setSearchQuery(value)
        setPageIndex(1)
    }

    const columns = [
        {
            title: 'Tên đăng nhập',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Thời gian đăng nhập',
            dataIndex: 'login_time',
            key: 'login_time',
            render: (text: string) => (
                <span>{new Date(text).toLocaleString()}</span>
            ),
        },
    ]

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Search
                enterButton
                placeholder="Tìm kiếm..."
                style={{ marginBottom: '20px' }}
                onSearch={onSearch}
            />
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={
                    searchQuery
                        ? false
                        : {
                              current: pageIndex,
                              pageSize: pageSize,
                              total: total,
                              onChange: onPaginationChange,
                          }
                }
                rowKey="_id"
            />
        </Space>
    )
}

export default LoginlogsTable
