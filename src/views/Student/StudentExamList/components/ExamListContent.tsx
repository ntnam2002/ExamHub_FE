import React, { useEffect } from 'react'
import classNames from 'classnames'
import GridItem, { GridItemProps } from './GridItem'
import Spinner from '@/components/ui/Spinner'
import { useAppDispatch, useAppSelector, getExaminations } from '../store'

const ExamListContent = () => {
    const dispatch = useAppDispatch()

    const loading = useAppSelector(
        (state) => state.examinationList.data.loading
    )
    const examinationList = useAppSelector(
        (state) => state.examinationList.data.examinationList
    )
    console.log('Examination list:', examinationList)

    const view = 'grid'

    useEffect(() => {
        dispatch(getExaminations())
    }, [dispatch])

    return (
        <div
            className={classNames(
                'mt-6 h-full flex flex-col',
                loading && 'justify-center'
            )}
        >
            {loading && (
                <div className="flex justify-center">
                    <Spinner size={40} />
                </div>
            )}
            {view === 'grid' && examinationList.length > 0 && !loading && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {examinationList.map((exam) => (
                        <GridItem
                            key={exam._id}
                            _id={exam._id}
                            exam_id={exam.exam_id}
                            total_score={exam.total_score}
                            started_at={exam.started_at}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ExamListContent
