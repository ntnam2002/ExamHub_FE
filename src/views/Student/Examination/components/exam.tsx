import React, { useState, useEffect, useRef, useCallback } from 'react'

import {
    getQuestionsByExamId,
    sendAnswer,
    useAppSelector,
    useAppDispatch,
} from '../../Examination/store'
import { useNavigate } from 'react-router-dom'
import ExamCamera from '../exam-camera/exam-camera'

import { getStudentIdFromToken } from '../../StudentExamList/store'

const ExamInterface = () => {
    const [timeLeft, setTimeLeft] = useState(60 * 60) // Initial time in seconds
    const [warning, setWarning] = useState(false)
    const [cheatAttempts, setCheatAttempts] = useState(0)
    const [cheatingStatus, setCheatingStatus] = useState('')
    const [currentQuestion, setCurrentQuestion] = useState(0)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useState<NodeJS.Timeout | null>(null)

    const examinationList = useAppSelector(
        (state) => state.examinationQuestionList.data.examinationQuestionList
    )

    const examCameraRef = useRef<{ stopCamera: () => void } | null>(null)
    useEffect(() => {
        dispatch(getQuestionsByExamId())
    }, [dispatch])

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setWarning(true)
                setCheatAttempts((prevAttempts) => prevAttempts + 1)
                setCheatingStatus('Cheating Detected: You left the exam tab')
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            )
        }
    }, [])
    useEffect(() => {
        const beforeUnloadEventHandler = (event: BeforeUnloadEvent) => {
            event.preventDefault()

            const warningMessage = 'Are you sure you want to leave the exam?'

            if (event) {
                event.returnValue = warningMessage // Legacy method for cross browser support
            }

            return warningMessage
        }

        window.addEventListener('beforeunload', beforeUnloadEventHandler, {
            capture: true,
        })

        return () => {
            window.removeEventListener(
                'beforeunload',
                beforeUnloadEventHandler,
                {
                    capture: true,
                }
            )
        }
    }, [])
    const handleCameraDetection = useCallback(() => {
        setCheatAttempts((prevAttempts) => prevAttempts + 1)
    }, [])
    useEffect(() => {
        if (cheatAttempts > 15) {
            alert(
                'You have been detected cheating multiple times. You will be redirected out of the exam page.'
            )
            submitAnswers()
        }
    }, [cheatAttempts])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(intervalId)
                    return 0
                }
                return prevTime - 1
            })
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${String(minutes).padStart(2, '0')}:${String(
            remainingSeconds
        ).padStart(2, '0')}`
    }

    const handleOptionChange = useCallback(
        (questionId: string, optionId: string) => {
            const currentAnswers = JSON.parse(
                localStorage.getItem('answers') || '[]'
            )

            const existingAnswerIndex = currentAnswers.findIndex(
                (answer: { questionId: string }) =>
                    answer.questionId === questionId
            )

            if (existingAnswerIndex !== -1) {
                currentAnswers[existingAnswerIndex].selectedOptionId = optionId
            } else {
                currentAnswers.push({ questionId, selectedOptionId: optionId })
            }

            localStorage.setItem('answers', JSON.stringify(currentAnswers))
        },
        []
    )

    const submitAnswers = useCallback(() => {
        const answers = JSON.parse(localStorage.getItem('answers') || '[]')

        if (answers.length === 0) {
            alert('No answers to submit.')
            return
        }

        const examId = examinationList[0]._id
        const studentId = getStudentIdFromToken()

        dispatch(sendAnswer({ examId, studentId, answers }))
            .unwrap()
            .then((response) => {
                alert('Answers submitted successfully.')
                localStorage.removeItem('answers')
                // Turn off the camera
                if (examCameraRef.current) {
                    examCameraRef.current.stopCamera()
                }
                navigate('/student/exams')
            })
            .catch((error) => {
                console.error('Error submitting answers:', error)
                alert('Error submitting answers.')
            })
    }, [dispatch, examinationList, navigate])

    const handleWarningAcknowledge = useCallback(() => {
        setWarning(false)
        setCheatAttempts((prevAttempts) => prevAttempts + 1)
    }, [])

    return (
        <div className="h-screen w-screen bg-gray-100 flex">
            <div className="fixed container mx-auto p-4 flex flex-grow">
                <div className="bg-white rounded-lg shadow-md p-8 w-full md:w-2/3">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Đề thi
                        </h2>
                    </div>

                    {examinationList?.length > 0 ? (
                        examinationList.map((exams) => (
                            <div key={exams._id}>
                                {exams.questions.map(
                                    (question, questionIndex) => (
                                        <div
                                            key={question._id}
                                            className={`${
                                                questionIndex !==
                                                currentQuestion
                                                    ? 'hidden'
                                                    : ''
                                            }`}
                                        >
                                            <div className="mb-6">
                                                <div className="text-lg font-semibold text-gray-800 mb-2">
                                                    {questionIndex + 1}.{' '}
                                                    {question.text}
                                                </div>
                                                <div className="mt-4 space-y-2">
                                                    {question.options.map(
                                                        (option) => (
                                                            <div
                                                                key={option._id}
                                                                className="flex items-center"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name={`question-${questionIndex}`}
                                                                    id={
                                                                        option._id
                                                                    }
                                                                    className="mr-2"
                                                                    onChange={() =>
                                                                        handleOptionChange(
                                                                            question._id,
                                                                            option._id
                                                                        )
                                                                    }
                                                                />
                                                                <label
                                                                    htmlFor={
                                                                        option._id
                                                                    }
                                                                    className="text-gray-700"
                                                                >
                                                                    {
                                                                        option.text
                                                                    }
                                                                </label>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        ))
                    ) : (
                        <div>Đang tải...</div>
                    )}
                </div>

                <div
                    className="fixed top-30 rounded-lg right-12 w-1/4 bg-white shadow-lg p-6"
                    style={{ zIndex: 10 }}
                >
                    <div className="text-lg text-gray-600 text-center">
                        Thời gian còn lại: {formatTime(timeLeft)}
                    </div>
                    <div className="text-lg text-gray-600 text-center">
                        Cheating Attempts: {cheatAttempts}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {examinationList &&
                            examinationList.map((exam, examIndex) =>
                                exam.questions.map(
                                    (question, questionIndex) => (
                                        <button
                                            key={question._id}
                                            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${
                                                questionIndex ===
                                                currentQuestion
                                                    ? 'bg-blue-300'
                                                    : ''
                                            }`}
                                            onClick={() =>
                                                setCurrentQuestion(
                                                    questionIndex
                                                )
                                            }
                                        >
                                            {questionIndex + 1}
                                        </button>
                                    )
                                )
                            )}
                    </div>
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg mt-4"
                        onClick={submitAnswers}
                    >
                        Nộp bài
                    </button>
                </div>
            </div>

            {warning && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <p className="text-red-600 font-bold mb-4">Cảnh báo!</p>
                        <p className="text-gray-700 mb-4">{cheatingStatus}</p>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={handleWarningAcknowledge}
                        >
                            Tôi đã hiểu!
                        </button>
                    </div>
                </div>
            )}
            <div className="fixed bottom-10 right-10 w-1/4 p-4 border-4 border-blue-500 rounded-lg">
                <ExamCamera ref={examCameraRef} />
            </div>
        </div>
    )
}

export default ExamInterface
