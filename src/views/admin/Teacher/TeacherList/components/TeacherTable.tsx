import { useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import {
    getTeachers,
    setSelectedTeacher,
    setTableData,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'
import dayjs from 'dayjs'
import TeacherDeleteConfirmation from './TeacherDeleteConfirmation'

type Teacher = {
    _id: string
    username: string
    email: string
    role: string
    class_names: string[]
    department_name: string
    created_at: Date
}

const ActionColumn = ({ row }: { row: Teacher }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/admin/teacher/edit/${row._id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedTeacher(row._id))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const TeacherColumn = ({ row }: { row: Teacher }) => {
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row._id}</span>
        </div>
    )
}

const TeacherTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.TeacherList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.TeacherList.data.filterData
    )

    const loading = useAppSelector((state) => state.TeacherList.data.loading)

    const data = useAppSelector((state) => state.TeacherList.data.teacherList)

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const fetchData = () => {
        dispatch(getTeachers())
    }

    const columns: ColumnDef<Teacher>[] = useMemo(
        () => [
            {
                header: 'Tên',
                accessorKey: 'name',
            },
            {
                header: 'Username',
                accessorKey: 'username',
            },

            {
                header: 'Email',
                accessorKey: 'email',
            },
            {
                header: 'Role',
                accessorKey: 'role',
            },
            {
                header: 'Lớp',
                accessorKey: 'class_names',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.class_names.join(', ')}</span>
                },
            },
            {
                header: 'Khoa',
                accessorKey: 'department_name',
            },
            // {
            //     header: 'Created At',
            //     accessorKey: 'created_at',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (
            //             <span>
            //                 {dayjs(row.created_at).format(
            //                     'YYYY-MM-DD HH:mm:ss'
            //                 )}
            //             </span>
            //         )
            //     },
            // },
            {
                header: 'Actions',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <TeacherDeleteConfirmation />
        </>
    )
}

export default TeacherTable
