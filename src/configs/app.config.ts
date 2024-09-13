import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'

export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    authenicatedEntryPathStudent: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    // apiPrefix: 'http://localhost:3120/',
    apiPrefix: 'https://examhub-be.onrender.com/',
    authenticatedEntryPath: `/admin/statistics`,
    authenicatedEntryPathStudent: `/student/statistics`,
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: `/${ADMIN_PREFIX_PATH}/statistics`,
    locale: 'vi',
    enableMock: false,
}

export default appConfig
