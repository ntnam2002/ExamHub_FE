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
    const [timeLeft, setTimeLeft] = useState(60 * 60)
    const [warning, setWarning] = useState(false)
    const [cheatAttempts, setCheatAttempts] = useState(0)
    const [cheatingStatus, setCheatingStatus] = useState('')
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [cameraAvailable, setCameraAvailable] = useState<boolean | null>(null)
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useState<NodeJS.Timeout | null>(null)

    const examinationList = useAppSelector(
        (state) => state.examinationQuestionList.data.examinationQuestionList
    )

    const examCameraRef = useRef<{ stopCamera: () => void } | null>(null)

    useEffect(() => {
        // Check for camera availability
        const checkCameraAvailability = () => {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    setCameraAvailable(true)
                    setMediaStream(stream)
                })
                .catch(() => {
                    setCameraAvailable(false)
                })
        }

        checkCameraAvailability()

        const handleDeviceChange = () => {
            checkCameraAvailability()
        }

        navigator.mediaDevices.addEventListener(
            'devicechange',
            handleDeviceChange
        )

        return () => {
            navigator.mediaDevices.removeEventListener(
                'devicechange',
                handleDeviceChange
            )
        }
    }, [])

    useEffect(() => {
        if (mediaStream) {
            const handleCameraEnded = () => {
                setCameraAvailable(false)
                setWarning(true)
                setCheatingStatus(
                    'Camera đã bị tắt. Vui lòng bật lại camera của bạn.'
                )
            }

            mediaStream
                .getVideoTracks()[0]
                .addEventListener('ended', handleCameraEnded)

            return () => {
                mediaStream
                    .getVideoTracks()[0]
                    .removeEventListener('ended', handleCameraEnded)
            }
        }
    }, [mediaStream])

    useEffect(() => {
        if (cameraAvailable) {
            dispatch(getQuestionsByExamId())
        }
    }, [dispatch, cameraAvailable])

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setWarning(true)
                setCheatAttempts((prevAttempts) => prevAttempts + 1)
                setCheatingStatus('Phát hiện gian lận: Bạn đã rời khỏi tab thi')
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

            const warningMessage =
                'Bạn có chắc chắn muốn rời khỏi trang thi không?'

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

    useEffect(() => {
        if (cheatAttempts > 15) {
            alert(
                'Bạn đã bị phát hiện gian lận nhiều lần. Bạn sẽ bị chuyển ra khỏi trang thi.'
            )
            if (examCameraRef.current) {
                examCameraRef.current.stopCamera()
            }
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
        if (timeLeft) {
            const confirmSubmit = confirm(
                'Bạn có chắc chắn muốn nộp bài sớm không?'
            )
            if (!confirmSubmit) {
                return
            }
        }
        const answers = JSON.parse(localStorage.getItem('answers') || '[]')
        if (answers.length === 0) {
            alert('Không có câu trả lời nào để nộp.')
            return
        }

        const examId = examinationList[0]._id
        const studentId = getStudentIdFromToken()

        dispatch(sendAnswer({ examId, studentId, answers }))
            .unwrap()
            .then((response) => {
                alert('Nộp bài thành công.')
                localStorage.removeItem('answers')

                console.log('Navigating to /student/exams')
                navigate('/student/exams')
            })
            .catch((error) => {
                console.error('Lỗi khi nộp bài:', error)
                alert('Lỗi khi nộp bài.')
            })
    }, [dispatch, examinationList, navigate])

    const handleWarningAcknowledge = useCallback(() => {
        setWarning(false)
        setCheatAttempts((prevAttempts) => prevAttempts + 1)
    }, [])

    if (cameraAvailable === null) {
        return (
            <div className="min-h-screen w-full bg-gray-100 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
                    <p className="text-gray-700 mb-4">
                        Đang kiểm tra khả năng sử dụng camera...
                    </p>
                </div>
            </div>
        )
    }

    if (!cameraAvailable) {
        return (
            <div className="min-h-screen w-full bg-gray-100 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
                    <p className="text-red-600 font-bold mb-4">
                        Yêu cầu camera
                    </p>
                    <p className="text-gray-700 mb-4">
                        Camera là bắt buộc để tham gia thi. Vui lòng bật camera
                        của bạn.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full bg-gray-100 flex justify-center">
            <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6">
                {/* Main content area */}
                <div className="bg-white rounded-lg shadow-md p-6 lg:w-2/3">
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

                {/* Sidebar */}
                <div className="lg:w-1/3 space-y-6">
                    {/* Timer and Cheating Attempts */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="text-lg text-gray-600 text-center mb-2">
                            Thời gian còn lại: {formatTime(timeLeft)}
                        </div>
                        <div className="text-lg text-gray-600 text-center">
                            Số lần gian lận: {cheatAttempts}
                        </div>
                    </div>

                    {/* Question navigation */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="max-h-60 overflow-y-auto">
                            <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-5 xl:grid-cols-7 gap-2">
                                {examinationList &&
                                    examinationList.map((exam) =>
                                        exam.questions.map(
                                            (question, questionIndex) => (
                                                <button
                                                    key={question._id}
                                                    className={`aspect-square bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded ${
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
                        </div>
                    </div>

                    {/* Submit button */}
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                        onClick={submitAnswers}
                    >
                        Nộp bài
                    </button>

                    {/* Camera */}
                    <div className="bg-white rounded-lg shadow-md p-4 border-4 border-blue-500">
                        <ExamCamera ref={examCameraRef} />
                    </div>
                </div>
            </div>

            {/* Warning modal */}
            {warning && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
                        <p className="text-red-600 font-bold mb-4">Cảnh báo!</p>
                        <p className="text-gray-700 mb-4">{cheatingStatus}</p>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                            onClick={handleWarningAcknowledge}
                        >
                            Tôi đã hiểu!
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ExamInterface
