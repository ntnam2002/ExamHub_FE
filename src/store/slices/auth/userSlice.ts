import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { stat } from 'fs'

export type UserState = {
    username: string
    authority: string
    accessToken: string | null
    refreshToken: string | null
}

const initialState: UserState = {
    username: 'Anonymous',
    authority: 'USER',
    accessToken: null,
    refreshToken: null,
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.username = action.payload.username
            state.authority = action.payload.authority
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
