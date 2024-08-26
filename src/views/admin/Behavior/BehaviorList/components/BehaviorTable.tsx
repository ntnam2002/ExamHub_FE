import React, { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import DataTable from '@/components/shared/DataTable' // Thay đổi đường dẫn nếu cần
import { Behavior } from './types'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import dayjs from 'dayjs'
import { apiGetAllBehavior } from '@/services/managementService'

const BehaviorTable = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        apiGetAllBehavior()
            .then((response) => {
                setData(response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.error(error)
                setLoading(false)
            })
    }, [])

    const columns = [
        {
            header: 'Tên sinh viên',
            accessorKey: 'studentName',
        },
        {
            header: 'Tên kỳ thi',
            accessorKey: 'examinationName',
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
        <DataTable
            columns={columns}
            data={data}
            loading={loading}
            // Thêm các thuộc tính khác của DataTable nếu cần
        />
    )
}

export default BehaviorTable
