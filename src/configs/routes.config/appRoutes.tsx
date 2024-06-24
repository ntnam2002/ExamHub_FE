import { lazy } from 'react'
import { APP_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, STUDENT } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const appsRoute: Routes = [
    {
        key: 'appsProject.exam',
        path: `${APP_PREFIX_PATH}/project/project-list`,
        component: lazy(() => import('@/views/quiz/ProjectList')),
        authority: [STUDENT],
    },
]
export default appsRoute
