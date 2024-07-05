export type SignInCredential = {
    username: string
    password: string
}

export type SignInResponse = {
    accessToken: string
    refreshToken: string
    username: string
    authority: string
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    username: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
