import { useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import {
    setTableData,
    setSelectedSubject,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
    getSubjects,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import SubjectDeleteConfirmation from './SubjectDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'
import dayjs from 'dayjs'

type Subject = {
    _id: string
    subject_name: string
    specializtion: string
    created_at: Date
}

const ActionColumn = ({ row }: { row: Subject }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/app/subjects/edit/${row._id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedSubject(row._id))
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

const SubjectColumn = ({ row }: { row: Subject }) => {
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>
                {row.subject_name}
            </span>
        </div>
    )
}

const SubjectTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.SubjectList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.SubjectList.data.filterData
    )

    const loading = useAppSelector((state) => state.SubjectList.data.loading)

    const data = useAppSelector((state) => state.SubjectList.data.subjectList)

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
        dispatch(getSubjects())
    }

    const columns: ColumnDef<Subject>[] = useMemo(
        () => [
            {
                header: 'Subject Name',
                accessorKey: 'subject_name',
            },
            {
                header: 'Specialization',
                accessorKey: 'specializtion',
            },
            {
                header: 'Created At',
                accessorKey: 'created_at',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>
                            {dayjs(row.created_at).format(
                                'YYYY-MM-DD HH:mm:ss'
                            )}
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
            <SubjectDeleteConfirmation />
        </>
    )
}

export default SubjectTable
