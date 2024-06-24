import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type UserState = {
    status: string
    data: {
        username: string
        authority: string
        accessToken: string | null
        refreshToken: string | null
    }
}

const initialState: UserState = {
    status: '',
    data: {
        username: 'Anonymous',
        authority: 'USER',
        accessToken: null,
        refreshToken: null,
    },
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.status = action.payload.status
            state.data.username = action.payload?.data.username
            state.data.authority = action.payload?.data.authority
            state.data.accessToken = action.payload?.data.accessToken
            state.data.refreshToken = action.payload?.data.refreshToken
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
