import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import { ADMIN, STUDENT, TEACHER } from '@/constants/roles.constant'
import { Meta } from '../../@types/routes'
import appsRoute from './appRoutes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
        meta: {},
    },
    ...appsRoute,
    /** Example purpose only, please remove */
]
