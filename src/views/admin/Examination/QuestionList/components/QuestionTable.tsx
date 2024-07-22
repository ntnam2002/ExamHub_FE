import { useEffect, useMemo, useRef } from 'react'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import {
    setTableData,
    setSelectedQuestion,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
    getQuestions,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import QuestionDeleteConfirmation from './QuestionDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'
import dayjs from 'dayjs'

type Option = {
    text: string
    is_correct: boolean
    _id: string
}

type Question = {
    _id: string
    text: string
    points: number
    options: Option[]
    created_at: Date
}

const ActionColumn = ({ row }: { row: Question }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/app/questions/question-edit/${row._id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedQuestion(row._id))
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

const QuestionTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.questionList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.questionList.data.filterData
    )

    const loading = useAppSelector((state) => state.questionList.data.loading)

    const data = useAppSelector((state) => state.questionList.data.questionList)

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
        dispatch(getQuestions())
    }

    const columns: ColumnDef<Question>[] = useMemo(
        () => [
            {
                header: 'ID',
                accessorKey: '_id',
                cell: (props) => {
                    return <span>{props.row.original._id}</span>
                },
            },
            {
                header: 'Question Text',
                accessorKey: 'text',
            },
            {
                header: 'Options',
                accessorKey: 'options',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <ul>
                            {row.options.map((option) => (
                                <li key={option._id}>
                                    {option.text}{' '}
                                    {option.is_correct ? '(Correct)' : ''}
                                </li>
                            ))}
                        </ul>
                    )
                },
            },
            {
                header: 'Points',
                accessorKey: 'points',
            },
            {
                header: 'Created At',
                accessorKey: 'created_at',
                cell: (props) => {
                    return (
                        <span>
                            {dayjs(props.row.original.created_at).format(
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
                loading={loading}
                pagingData={{
                    total: tableData?.total,
                    pageIndex: tableData?.pageIndex,
                    pageSize: tableData?.pageSize,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <QuestionDeleteConfirmation />
        </>
    )
}

export default QuestionTable
