import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { FaceMesh } from '@mediapipe/face_mesh'
import { Camera } from '@mediapipe/camera_utils'
import {
    getExaminations,
    getStudentIdFromToken,
    sendAnswer,
    useAppDispatch,
    useAppSelector,
} from '../store' // Assuming Examination type is exported from store
import { useNavigate } from 'react-router-dom'

function ExamInterface() {
    const [timeLeft, setTimeLeft] = useState(60 * 60) // Initial time in seconds
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null) // 60 minutes = 3600 seconds
    const [warning, setWarning] = useState(false)
    const [cheatAttempts, setCheatAttempts] = useState(0)
    const [cheatingStatus, setCheatingStatus] = useState('')
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const videoRef = useRef<HTMLVideoElement>(null)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [faceDetected, setFaceDetected] = useState(true)
    const [detectTimeoutId, setDetectTimeoutId] = useState<NodeJS.Timeout | null>(null)
    const examinationList = useAppSelector(
        (state) => state.examinationList.data.examinationList
    )

    useEffect(() => {
        dispatch(getExaminations())
    }, [dispatch])

    useEffect(() => {
        const startVideo = () => {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream
                    }
                    // Cleanup function to stop the video stream
                    return () =>
                        stream.getTracks().forEach((track) => track.stop())
                })
                .catch((err) => console.error('Error accessing webcam:', err))
        }

        startVideo()

        const handleVisibilityChange = () => {
            if (document.hidden) {
                setWarning(true)
                setCheatAttempts((prevAttempts) => prevAttempts + 1)
                setCheatingStatus('Cheating Detected: You left the exam tab')
                // Keep the warning visible for at least 5 seconds
                setTimeout(() => setWarning(false), 5000)
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        // Cleanup function to remove event listener
        return () => {
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            )
        }
    }, [])

    useEffect(() => {
        let camera: Camera | undefined
        if (videoRef.current) {
            const faceMesh = new FaceMesh({
                locateFile: (file) =>
                    `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
            })
            faceMesh.setOptions({
                maxNumFaces: 1,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5,
            })

            const onResults = (results: { multiFaceLandmarks: string | any[] }) => {
                if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
                    const landmarks = results.multiFaceLandmarks[0];
            
                    // Lấy tọa độ của các điểm đặc trưng trên khuôn mặt
                    const leftEye = landmarks[33]; // Điểm 33 là điểm giữa mắt trái
                    const rightEye = landmarks[263]; // Điểm 263 là điểm giữa mắt phải
                    const nose = landmarks[1]; // Điểm 1 là điểm giữa mũi
            
                    // Tính toán khoảng cách giữa các điểm
                    const leftToNose = Math.sqrt(
                        Math.pow(leftEye.x - nose.x, 2) +
                        Math.pow(leftEye.y - nose.y, 2) +
                        Math.pow(leftEye.z - nose.z, 2)
                    );
                    const rightToNose = Math.sqrt(
                        Math.pow(rightEye.x - nose.x, 2) +
                        Math.pow(rightEye.y - nose.y, 2) +
                        Math.pow(rightEye.z - nose.z, 2)
                    );
            
                    const faceTurned = leftToNose / rightToNose;
            
                    if (faceTurned < 0.5 || faceTurned > 1.5) {
                        // Khuôn mặt quay hẳn sang một bên
                        setWarning(true);
                        setCheatingStatus('Cheating Detected: Face turned to the side');
                        setCheatAttempts((prevAttempts) => prevAttempts + 1);
                    } else {
                        // Reset face detection flag and clear timeout
                        if (!faceDetected) {
                            setFaceDetected(true);
                            setWarning(false);
                            if (detectTimeoutId) {
                                clearTimeout(detectTimeoutId);
                                setDetectTimeoutId(null);
                            }
                        }
                    }
                } else {
                    // Set a timeout to detect face loss after a delay
                    if (faceDetected) {
                        const timeoutId = setTimeout(() => {
                            setFaceDetected(false);
                            setWarning(true);
                            setCheatingStatus('Cheating Detected: Face not detected');
                            setCheatAttempts((prevAttempts) => prevAttempts + 1);
                        }, 2000); // Delay 2 seconds before confirming face loss
                        setDetectTimeoutId(timeoutId);
                    }
                }
            };

            faceMesh.onResults(onResults)

            camera = new Camera(videoRef.current, {
                onFrame: async () => {
                    if (videoRef.current) {
                        await faceMesh.send({ image: videoRef.current })
                    }
                },
                width: 640,
                height: 480,
            })
            camera.start()
        }

        // Cleanup function to stop the camera
        return () => {
            if (camera) {
                camera.stop()
            }
        }
        
    }, [])
    useEffect(()=>{
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setWarning(true)
                setCheatAttempts((prevAttempts) => prevAttempts + 1)
                setCheatingStatus('Cheating Detected: You left the exam tab')
                // Keep the warning visible for at least 5 seconds
                setTimeout(() => setWarning(false), 5000)
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        // Cleanup function to remove event listener
        return () => {
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            )
        }
    },[])
    useEffect(() => {
        if (cheatAttempts > 100) {
            alert(
                'You have been detected cheating multiple times. Your exam will be terminated.'
            )
            navigate('/student/exams')
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

    const handleOptionChange = (questionId: string, optionId: string) => {
        const currentAnswers = JSON.parse(
            localStorage.getItem('answers') || '[]'
        )

        const existingAnswerIndex = currentAnswers.findIndex(
            (answer: { questionId: string }) => answer.questionId === questionId
        )

        if (existingAnswerIndex !== -1) {
            currentAnswers[existingAnswerIndex].selectedOptionId = optionId
        } else {
            currentAnswers.push({ questionId, selectedOptionId: optionId })
        }

        localStorage.setItem('answers', JSON.stringify(currentAnswers))
        console.log('Selected option for question', questionId, ':', optionId)
    }

    const submitAnswers = () => {
        const answers = JSON.parse(localStorage.getItem('answers') || '[]')

        if (answers.length === 0) {
            alert('No answers to submit.')
            return
        }

        const examId = examinationList[0]._id // Assuming single exam for simplicity
        const studentId = getStudentIdFromToken() // Extract student ID from token

        dispatch(sendAnswer({ examId, studentId, answers }))
            .unwrap()
            .then((response) => {
                console.log('Submitted:', response)
                alert('Answers submitted successfully.')
                localStorage.removeItem('answers')
                navigate('/student/exams')
            })
            .catch((error) => {
                console.error('Error submitting answers:', error)
                alert('Error submitting answers.')
            })
    }

    return (
        <div className="absolute min-h-screen bg-gray-100 flex">
            <div className="fixed container mx-auto p-4 flex flex-grow">
                <div className="bg-white rounded-lg shadow-md p-8 w-full md:w-2/3">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Exam Content
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
                        <div>Loading...</div>
                    )}
                </div>

                <div
                    className="fixed top-30 rounded-lg right-12 w-1/4 bg-white shadow-lg p-6"
                    style={{ zIndex: 10 }}
                >
                    <div className="text-lg text-gray-600 text-center">
                        Time Left: {formatTime(timeLeft)}
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
                        Submit
                    </button>
                </div>
            </div>

            {warning && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <p className="text-red-600 font-bold mb-4">Warning!</p>
                        <p className="text-gray-700 mb-4">{cheatingStatus}</p>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setWarning(false)}
                        >
                            I Understand
                        </button>
                    </div>
                </div>
            )}

            <video
                ref={videoRef}
                autoPlay
                muted
                className="fixed bottom-10 right-10 w-1/4 p-4 border-4 border-blue-500 rounded-lg"
            ></video>
        </div>
    )
}

export default ExamInterface
