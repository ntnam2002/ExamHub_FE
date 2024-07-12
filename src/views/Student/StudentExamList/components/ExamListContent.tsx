// import { useEffect } from 'react'
// import classNames from 'classnames'
// import GridItem from './GridItem'
// import ListItem from './ListItem'
// import Spinner from '@/components/ui/Spinner'
// import { getList, useAppDispatch, useAppSelector } from '../store'

// const ExamListContent = () => {
//     const dispatch = useAppDispatch()

//     const loading = useAppSelector((state) => state.examlist.data.loading)
//     const examlist = useAppSelector((state) => state.examlist.data.examlist)
//     const view = useAppSelector((state) => state.examlist.data.view)
//     const { sort, search } = useAppSelector(
//         (state) => state.examlist.data.query
//     )

//     useEffect(() => {
//         dispatch(getList({ sort, search }))
//     }, [dispatch, sort, search])

//     return (
//         <div
//             className={classNames(
//                 'mt-6 h-full flex flex-col',
//                 loading && 'justify-center'
//             )}
//         >
//             {loading && (
//                 <div className="flex justify-center">
//                     <Spinner size={40} />
//                 </div>
//             )}
//             {view === 'grid' && examlist.length > 0 && !loading && (
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                     {examlist.map((exam) => (
//                         <GridItem key={exam.id} data={exam} />
//                     ))}
//                 </div>
//             )}
//             {view === 'list' &&
//                 examlist.length > 0 &&
//                 !loading &&
//                 examlist.map((exam) => <ListItem key={exam.id} data={exam} />)}
//         </div>
//     )
// }

// export default ExamListContent

import { useState } from 'react'
import classNames from 'classnames'
import GridItem from './GridItem'
//import ListItem from './ListItem'
import Spinner from '@/components/ui/Spinner'

const ExamListContent = () => {
    const [loading, setLoading] = useState(false)
    const [view, setView] = useState('grid')

    const examlist = [
        {
            id: 1,
            name: 'Math Exam',
            category: 'Mathematics',
            desc: 'Final math exam for the semester',
            attachmentCount: 2,
            totalTask: 10,
            completedTask: 5,
            progression: 50,
            dayleft: 10,
            status: 'in-progress',
            member: [
                { name: 'John Doe', img: 'https://via.placeholder.com/150' },
                { name: 'Jane Smith', img: 'https://via.placeholder.com/150' },
            ],
        },
        {
            id: 2,
            name: 'Science Exam',
            category: 'Science',
            desc: 'Final science exam for the semester',
            attachmentCount: 3,
            totalTask: 15,
            completedTask: 10,
            progression: 66,
            dayleft: 5,
            status: 'in-progress',
            member: [
                {
                    name: 'Alice Johnson',
                    img: 'https://via.placeholder.com/150',
                },
                { name: 'Bob Brown', img: 'https://via.placeholder.com/150' },
            ],
        },
        // Add more sample exams as needed
    ]

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
            {/* {view === 'list' &&
                examlist.length > 0 &&
                !loading &&
                examlist.map((exam) => <ListItem key={exam.id} data={exam} />)} */}
        </div>
    )
}

export default ExamListContent
