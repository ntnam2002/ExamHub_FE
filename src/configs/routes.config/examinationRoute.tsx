import { lazy } from 'react'
import type { Routes } from '@/@types/routes'
import { STUDENT_PREFIX_PATH } from '@/constants/route.constant'
import { STUDENT } from '@/constants/roles.constant'

const examinationRoute: Routes = [
    {
        key: 'ExamHub.student.exam.detail',
        path: `${STUDENT_PREFIX_PATH}/exam/examination`,
        component: lazy(
            () => import('@/views/Student/Examination/components/exam')
        ),
        authority: [STUDENT],
    },
]

export default examinationRoute
