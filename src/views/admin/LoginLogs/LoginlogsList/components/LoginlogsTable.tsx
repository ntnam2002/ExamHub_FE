import React, { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import DataTable from '@/components/shared/DataTable' // Thay đổi đường dẫn nếu cần
import { Behavior } from './types'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import dayjs from 'dayjs'
import {
    apiGetAllBehavior,
    apiGetAllLoginLogs,
} from '@/services/managementService'

const LoginlogsTable = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        apiGetAllLoginLogs()
            .then((response) => {
                console.log(response.data)
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
            header: 'Tên đăng nhập',
            accessorKey: 'username',
        },
        {
            header: 'Tên ',
            accessorKey: 'name',
        },
        {
            header: 'Thời gian đăng nhập',
            accessorKey: 'login_time',
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

export default LoginlogsTable
