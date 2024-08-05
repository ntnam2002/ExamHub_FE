import { Meta, Routes } from '@/@types/routes'
import { ADMIN } from '@/constants/roles.constant'
import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'
import { lazy, LazyExoticComponent } from 'react'

const adminRoutes: Routes = [
    {
        key: 'ExamHub.admin.home',
        path: `${ADMIN_PREFIX_PATH}/home`,
        component: lazy(() => import('@/views/Home')),
        authority: [ADMIN],
    },
    {
        key: 'ExamHub.admin.student',
        path: `${ADMIN_PREFIX_PATH}/student`,
        component: lazy(
            () => import('@/views/admin/Student/StudentList/StudentList')
        ),
        authority: [ADMIN],
    },
    {
        key: 'ExamHub.admin.student-new',
        path: `${ADMIN_PREFIX_PATH}/student/new`,
        component: lazy(() => import('@/views/admin/Student/StudentNew')),
        authority: [ADMIN],
    },
    {
        key: 'ExamHub.admin.student-edit',
        path: `${ADMIN_PREFIX_PATH}/student/edit/:id`,
        component: lazy(() => import('@/views/admin/Student/StudentEdit')),
        authority: [ADMIN],
    },
    {
        key: 'ExamHub.admin.question',
        path: `${ADMIN_PREFIX_PATH}/question`,
        component: lazy(() => import('@/views/admin/Examination/QuestionList')),
        authority: [ADMIN],
    },
    {
        key: 'ExamHub.admin.exam',
        path: `${ADMIN_PREFIX_PATH}/exam`,
        component: lazy(
            () => import('@/views/admin/Examination/ExamList')
        ) as LazyExoticComponent<<T extends Meta>(props: T) => JSX.Element>,
        authority: [ADMIN],
    },
    {
        key: 'ExamHub.admin.examination',
        path: `${ADMIN_PREFIX_PATH}/examination`,
        component: lazy(
            () => import('@/views/admin/Examination/ExaminationList')
        ),
        authority: [ADMIN],
    },
    {
        key: 'ExamHub.admin.examination-new',
        path: `${ADMIN_PREFIX_PATH}/examination/new`,
        component: lazy(
            () =>
                import(
                    '@/views/admin/Examination/ExaminationList/components/ExaminationForm'
                )
        ) as LazyExoticComponent<<T extends Meta>(props: T) => JSX.Element>,
        authority: [ADMIN],
    },
]

export default adminRoutes
