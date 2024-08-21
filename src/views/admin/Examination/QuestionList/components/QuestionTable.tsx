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
    subject_name: string
    difficulty: string
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
        if (tableRef.current) {
            tableRef.current.resetSorting()
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
                header: 'Câu hỏi',
                accessorKey: 'text',
            },
            {
                header: 'Lựa chọn',
                accessorKey: 'options',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <ul>
                            {row.options.map((option) => (
                                <li key={option._id}>
                                    {option.text}{' '}
                                    {option.is_correct ? '(Đúng)' : ''}
                                </li>
                            ))}
                        </ul>
                    )
                },
            },
            {
                header: 'Điểm',
                accessorKey: 'points',
            },
            {
                header: 'Môn học',
                accessorKey: 'subject',
                cell: (props) => {
                    return <span>{props.row.original.subject_name}</span>
                },
            },
            {
                header: 'Độ khó',
                accessorKey: 'difficulty',
                cell: (props) => {
                    return <span>{props.row.original.difficulty}</span>
                },
            },
            // {
            //     header: 'Tạo lúc',
            //     accessorKey: 'created_at',
            //     cell: (props) => {
            //         return (
            //             <span>
            //                 {dayjs(props.row.original.created_at).format(
            //                     'YYYY-MM-DD HH:mm:ss'
            //                 )}
            //             </span>
            //         )
            //     },
            // },
            {
                header: 'Hành động',
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
            <QuestionDeleteConfirmation />
        </>
    )
}

export default QuestionTable
