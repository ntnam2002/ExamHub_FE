// QuestionReducer.ts
import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducers, {
    ExaminationDataListState,
    SLICE_NAME,
} from './ExaminationSlice'
import { useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const questionPersistConfig = {
    key: SLICE_NAME,
    storage,
}

const combinedReducer = combineReducers({
    data: reducers,
})

const persistedQuestionReducer = persistReducer(
    questionPersistConfig,
    combinedReducer
)

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: ExaminationDataListState
        }
    }
> = useSelector

export * from './ExaminationSlice'
export { useAppDispatch } from '@/store'
export default persistedQuestionReducer
