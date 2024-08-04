import { combineReducers } from '@reduxjs/toolkit'
import reducers, {
    ExaminationDataListState,
    ExaminationQuestionListResponse,
    SLICE_NAME,
} from './ExaminationSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const Questionreducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: ExaminationDataListState
        }
    }
> = useSelector

export * from './ExaminationSlice'
export { useAppDispatch } from '@/store'
export default Questionreducer
