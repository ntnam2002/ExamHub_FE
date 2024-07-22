import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../store'
import { getScore } from '../store/examinationSlice' // Update the path as necessary

type ScoreDisplayProps = {
    examId: string
    studentId: string
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ examId, studentId }) => {
    const dispatch = useAppDispatch()
    const score = useAppSelector((state) => state.examinationList.score)
    const loading = useAppSelector((state) => state.examinationList.loading)

    useEffect(() => {
        dispatch(getScore({ examId, studentId }))
    }, [dispatch, examId, studentId])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="score-display">
            {score !== null ? (
                <div>
                    <h2>Your Score: {score}</h2>
                </div>
            ) : (
                <div>Loading</div>
            )}
        </div>
    )
}

export default ScoreDisplay
