import {
    apiSignInAdmin,
    apiSignInUser,
    apiSignOut,
    apiSignUp,
} from '@/services/AuthService'
import {
    setUser,
    signInSuccess,
    signOutSuccess,
    useAppSelector,
    useAppDispatch,
} from '@/store'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import type { SignInCredential, SignUpCredential } from '@/@types/auth'
import { stat } from 'fs'

type Status = 'success' | 'failed'

function useAuth() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const query = useQuery()
    const { accessToken, refreshToken, signedIn } = useAppSelector(
        (state) => state.auth.session
    )
    const signIn = async (
        values: SignInCredential,
        isAdmin: boolean
    ): Promise<
        | {
              status: 'success' | 'failed'
              message: string
          }
        | undefined
    > => {
        try {
            const resp = await (isAdmin
                ? apiSignInAdmin(values)
                : apiSignInUser(values))
            if (resp.data && resp.status === 'success') {
                const { accessToken, refreshToken } = resp.data

                dispatch(
                    signInSuccess({
                        accessToken,
                        refreshToken,
                        signedIn: true,
                    })
                )

                const userData = resp.data || {
                    username: 'Anonymous',
                    authority: 'user',
                    accessToken: '',
                    refreshToken: '',
                }

                dispatch(setUser(userData))

                const redirectUrl = query.get(REDIRECT_URL_KEY)

                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )

                return {
                    status: 'success',
                    message: '',
                }
            } else {
                console.log('No data in response or status is not success')
            }
        } catch (errors: any) {
            console.error('API Error:', errors)
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const signUp = async (values: SignUpCredential) => {
        try {
            const resp = await apiSignUp(values)
            if (resp.data) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const accessToken = resp.data

                dispatch(signInSuccess(accessToken))
                const userData = resp.data || {
                    username: 'Anonymous',
                    authority: 'user',
                    accessToken: '',
                    refreshToken: '',
                }

                dispatch(setUser(userData))
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const handleSignOut = () => {
        dispatch(signOutSuccess())
        dispatch(
            setUser({
                accessToken: '',
                refreshToken: '',
                username: 'Anonymous',
                authority: 'user',
            })
        )
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        await apiSignOut()
        handleSignOut()
    }

    return {
        authenticated: !!accessToken && refreshToken && signedIn,
        signIn,
        signUp,
        signOut,
    }
}

export default useAuth
