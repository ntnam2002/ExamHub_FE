import { combineReducers } from '@reduxjs/toolkit'
import session, { SessionState } from './sessionSlice'
import user, { UserState } from './userSlice'
import DataTable from '../../../components/shared/DataTable'

const reducer = combineReducers({
    session,
    user,
})

export type AuthState = {
    session: SessionState
    data: UserState
}

export * from './sessionSlice'
export * from './userSlice'

export default reducer
