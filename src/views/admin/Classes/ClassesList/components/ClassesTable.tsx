import { useEffect, useMemo, useRef } from 'react'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import {
    getClassess,
    setSelectedClass,
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
import ClassDeleteConfirmation from './ClassesDeleteConfirmation'

type Class = {
    _id: string
    class_name: string
    teacherId: string
    student_ids: string[]
    create_at: Date
    update_at: Date
}

const ActionColumn = ({ row }: { row: Class }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/app/admin/class-edit/${row._id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedClass(row._id))
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

const ClassColumn = ({ row }: { row: Class }) => {
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>
                {row.class_name}
            </span>
        </div>
    )
}

const ClassTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.ClassesList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.ClassesList.data.filterData
    )

    const loading = useAppSelector((state) => state.ClassesList.data.loading)

    const data = useAppSelector((state) => state.ClassesList.data.classList)

    useEffect(() => {
        fetchData()
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
        dispatch(getClassess())
    }

    const columns: ColumnDef<Class>[] = useMemo(
        () => [
            {
                header: 'Class Name',
                accessorKey: 'class_name',
                cell: (props) => <ClassColumn row={props.row.original} />,
            },
            {
                header: 'Chuyên ngành',
                accessorKey: 'specialization',
            },
            // {
            //     header: 'Teacher ID',
            //     accessorKey: 'teacherId',
            // },
            // {
            //     header: 'Student IDs',
            //     accessorKey: 'student_ids',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return <span>{row.student_ids?.join(', ')}</span>
            //     },
            // },
            {
                header: 'Created At',
                accessorKey: 'create_at',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>
                            {dayjs(row.create_at).format('YYYY-MM-DD HH:mm:ss')}
                        </span>
                    )
                },
            },
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
            <ClassDeleteConfirmation />
        </>
    )
}

export default ClassTable
