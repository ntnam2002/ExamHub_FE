export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: 'http://localhost:3120/',
    //apiPrefix: 'https://examhub-be.onrender.com/',
    authenticatedEntryPath: '/',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'vi',
    enableMock: false,
}

export default appConfig
