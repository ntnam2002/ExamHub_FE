export type SignInCredential = {
    username: string
    password: string
}

export type SignInResponse = {
    status: string
    data: {
        accessToken: string
        refreshToken: string
        username: string
        authority: string
    }
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    username: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
