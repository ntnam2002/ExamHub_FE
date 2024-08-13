import { combineReducers } from '@reduxjs/toolkit'
import reducers, {
    DepartmentListState,
    SLICE_NAME,
} from './DepartmentListSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: DepartmentListState
        }
    }
> = useSelector

export * from './DepartmentListSlice'
export { useAppDispatch } from '@/store'
export default reducer
