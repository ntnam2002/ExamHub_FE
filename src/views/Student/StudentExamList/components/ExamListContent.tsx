import { useEffect } from 'react'
import classNames from 'classnames'
import GridItem from './GridItem'
import ListItem from './ListItem'
import Spinner from '@/components/ui/Spinner'
import { getList, useAppDispatch, useAppSelector } from '../store'

const ExamListContent = () => {
    const dispatch = useAppDispatch()

    const loading = useAppSelector((state) => state.examlist.data.loading)
    const examlist = useAppSelector((state) => state.examlist.data.examlist)
    const view = useAppSelector((state) => state.examlist.data.view)
    const { sort, search } = useAppSelector(
        (state) => state.examlist.data.query
    )

    useEffect(() => {
        dispatch(getList({ sort, search }))
    }, [dispatch, sort, search])

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
            {view === 'grid' && examlist.length > 0 && !loading && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {examlist.map((exam) => (
                        <GridItem key={exam.id} data={exam} />
                    ))}
                </div>
            )}
            {view === 'list' &&
                examlist.length > 0 &&
                !loading &&
                examlist.map((exam) => <ListItem key={exam.id} data={exam} />)}
        </div>
    )
}

export default ExamListContent
