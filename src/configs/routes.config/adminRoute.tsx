import { Meta, Routes } from '@/@types/routes'
import { ADMIN, TEACHER } from '@/constants/roles.constant'
import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'
import { lazy, LazyExoticComponent } from 'react'

const adminRoutes: Routes = [
    {
        key: 'ExamHub.admin.statistics',
        path: `${ADMIN_PREFIX_PATH}/statistics`,
        component: lazy(
            () => import('@/views/admin/Statistic')
        ) as LazyExoticComponent<<T extends Meta>(props: T) => JSX.Element>,
        authority: [ADMIN, TEACHER],
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
        key: 'ExamHub.admin.teacher',
        path: `${ADMIN_PREFIX_PATH}/teacher`,
        component: lazy(() => import('@/views/admin/Teacher/TeacherList')),
        authority: [ADMIN],
    },
    {
        key: 'ExamHub.admin.teacher-new',
        path: `${ADMIN_PREFIX_PATH}/teacher/new`,
        component: lazy(() => import('@/views/admin/Teacher/TeacherNew')),
        authority: [ADMIN],
    },
    {
        key: 'ExamHub.admin.teacher-edit',
        path: `${ADMIN_PREFIX_PATH}/teacher/edit/:id`,
        component: lazy(() => import('@/views/admin/Teacher/TeacherEdit')),
        authority: [ADMIN],
    },

    {
        key: 'ExamHub.admin.question',
        path: `${ADMIN_PREFIX_PATH}/question`,
        component: lazy(() => import('@/views/admin/Examination/QuestionList')),
        authority: [ADMIN, TEACHER],
    },
    {
        key: 'ExamHub.admin.question-new',
        path: `${ADMIN_PREFIX_PATH}/question/new`,
        component: lazy(() => import('@/views/admin/Examination/QuestionNew')),
        authority: [ADMIN, TEACHER],
    },
    {
        key: 'ExamHub.admin.question-edit',
        path: `${ADMIN_PREFIX_PATH}/question/edit/:id`,
        component: lazy(() => import('@/views/admin/Examination/QuestionEdit')),
        authority: [ADMIN, TEACHER],
    },
    {
        key: 'ExamHub.admin.exam',
        path: `${ADMIN_PREFIX_PATH}/exam`,
        component: lazy(
            () => import('@/views/admin/Examination/ExamList')
        ) as LazyExoticComponent<<T extends Meta>(props: T) => JSX.Element>,
        authority: [ADMIN, TEACHER],
    },
    {
        key: 'ExamHub.admin.exam-new',
        path: `${ADMIN_PREFIX_PATH}/exam/new`,
        component: lazy(
            () =>
                import('@/views/admin/Examination/ExamList/components/ExamForm')
        ) as LazyExoticComponent<<T extends Meta>(props: T) => JSX.Element>,
        authority: [ADMIN, TEACHER],
    },
    {
        key: 'ExamHub.admin.exam-edit',
        path: `${ADMIN_PREFIX_PATH}/exam/edit/:id`,
        component: lazy(
            () =>
                import('@/views/admin/Examination/ExamList/components/ExamForm')
        ) as LazyExoticComponent<<T extends Meta>(props: T) => JSX.Element>,
        authority: [ADMIN, TEACHER],
    },
    {
        key: 'ExamHub.admin.examination',
        path: `${ADMIN_PREFIX_PATH}/examination`,
        component: lazy(
            () => import('@/views/admin/Examination/ExaminationList')
        ),
        authority: [ADMIN, TEACHER],
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
        authority: [ADMIN, TEACHER],
    },
    {
        key: 'ExamHub.admin.department',
        path: `${ADMIN_PREFIX_PATH}/department`,
        component: lazy(
            () => import('@/views/admin/Department/DepartmentList')
        ),
        authority: [ADMIN],
    },
    {
        key: 'ExamHub.admin.department-new',
        path: `${ADMIN_PREFIX_PATH}/department/new`,
        component: lazy(() => import('@/views/admin/Department/DepartmentNew')),
        authority: [ADMIN],
    },
    {
        key: 'ExamHub.admin.department-edit',
        path: `${ADMIN_PREFIX_PATH}/department/edit/:id`,
        component: lazy(
            () => import('@/views/admin/Department/DepartmentEdit')
        ),
        authority: [ADMIN],
    },
    {
        key: 'ExamHub.admin.class',
        path: `${ADMIN_PREFIX_PATH}/class`,
        component: lazy(() => import('@/views/admin/Classes/ClassesList')),
        authority: [ADMIN],
    },
    {
        key: 'ExamHub.admin.class-new',
        path: `${ADMIN_PREFIX_PATH}/class/new`,
        component: lazy(() => import('@/views/admin/Classes/ClassesNew')),
        authority: [ADMIN],
    },
    {
        key: 'ExamHub.admin.class-edit',
        path: `${ADMIN_PREFIX_PATH}/class/edit/:id`,
        component: lazy(() => import('@/views/admin/Classes/ClassesEdit')),
        authority: [ADMIN],
    },
    {
        key: 'ExamHub.admin.subject',
        path: `${ADMIN_PREFIX_PATH}/subject`,
        component: lazy(() => import('@/views/admin/Subject/SubjectList')),
        authority: [ADMIN],
    },
    {
        key: 'ExamHub.admin.subject-new',
        path: `${ADMIN_PREFIX_PATH}/subject/new`,
        component: lazy(() => import('@/views/admin/Subject/SubjectNew')),
        authority: [ADMIN],
    },
    {
        key: 'ExamHub.admin.behavior',
        path: `${ADMIN_PREFIX_PATH}/behavior`,
        component: lazy(() => import('@/views/admin/Behavior/BehaviorList')),
        authority: [ADMIN],
    },
    {
        key: 'ExamHub.admin.loginlogs',
        path: `${ADMIN_PREFIX_PATH}/loginlogs`,
        component: lazy(
            () => import('@/views/admin/LoginLogs/LoginlogsList/LoginLogs')
        ),
        authority: [ADMIN],
    },
]

export default adminRoutes
