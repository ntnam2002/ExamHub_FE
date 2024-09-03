import React, { useEffect, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import debounce from 'lodash/debounce'
import DataTable from '@/components/shared/DataTable'
import Input from '@/components/ui/Input'
import {
    apiGetAllBehavior,
    apiSearchBehavior,
} from '@/services/managementService'

const BehaviorTable = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('')

    useEffect(() => {
        fetchAllBehaviors()
    }, [])

    const fetchAllBehaviors = async () => {
        try {
            const response = await apiGetAllBehavior()
            setData(response.data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching behaviors:', error)
            setLoading(false)
        }
    }

    const fetchBehavior = debounce(async (searchQuery: string) => {
        if (!searchQuery) {
            fetchAllBehaviors()
            return
        }

        setLoading(true)
        try {
            const response = await apiSearchBehavior(searchQuery)
            setData(response.data)
        } catch (error) {
            console.error('Error searching behaviors:', error)
        } finally {
            setLoading(false)
        }
    }, 300)

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)
        fetchBehavior(value)
    }

    const columns = [
        {
            header: 'Tên sinh viên',
            accessorKey: 'student_name',
        },
        {
            header: 'Tên kỳ thi',
            accessorKey: 'examination_name',
        },
        {
            header: 'Hành vi',
            accessorKey: 'behavior',
        },
        {
            header: 'Thời gian',
            accessorKey: 'date',
        },
    ]

    return (
        <div className="space-y-4">
            <Input
                className="max-w-md"
                size="sm"
                placeholder="Tìm sinh viên"
                prefix={<HiOutlineSearch className="text-lg" />}
                value={query}
                onChange={onSearch}
            />
            <DataTable columns={columns} data={data} loading={loading} />
        </div>
    )
}

export default BehaviorTable
