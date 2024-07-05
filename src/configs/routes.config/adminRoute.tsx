import { Routes } from '@/@types/routes'
import { ADMIN } from '@/constants/roles.constant'
import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'
import { lazy } from 'react'

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
]

export default adminRoutes
