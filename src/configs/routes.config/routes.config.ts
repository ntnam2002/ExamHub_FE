import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

import { ADMIN } from '@/constants/roles.constant'
import adminRoutes from './adminRoute'
import studentRoutes from './studentRoute'
import examinationRoute from './examinationRoute'

export const publicRoutes: Routes = [...authRoute]
export const protectedRoutes: Routes = [
    ...adminRoutes,
    ...studentRoutes,
    ...examinationRoute,
]
