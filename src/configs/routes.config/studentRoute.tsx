import { Routes } from '@/@types/routes'
import { ADMIN, STUDENT } from '@/constants/roles.constant'
import {
    ADMIN_PREFIX_PATH,
    STUDENT_PREFIX_PATH,
} from '@/constants/route.constant'
import { lazy } from 'react'

const studentRoutes: Routes = [
    {
        key: 'ExamHub.student.home',
        path: `${STUDENT_PREFIX_PATH}/home`,
        component: lazy(() => import('@/views/Home')),
        authority: [STUDENT],
    },
    {
        key: 'ExamHub.student.exam',
        path: `${STUDENT_PREFIX_PATH}/exam`,
        component: lazy(() => import('@/views/Student/StudentExamList')),
        authority: [STUDENT],
    },
    {
        key: 'ExamHub.student.exam.detail',
        path: `${STUDENT_PREFIX_PATH}/exam/examination`,
        component: lazy(
            () => import('@/views/Student/Examination/components/exam')
        ),
        authority: [STUDENT],
    },
]

export default studentRoutes
