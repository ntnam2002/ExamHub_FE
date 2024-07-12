import React, { useState, useEffect, useRef } from 'react'
import { FaceMesh } from '@mediapipe/face_mesh'
import { Camera } from '@mediapipe/camera_utils'

function ExamInterface() {
    const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes = 3600 seconds
    const [warning, setWarning] = useState(false)
    const [cheatAttempts, setCheatAttempts] = useState(0)
    const [cheatingStatus, setCheatingStatus] = useState('')
    const videoRef = useRef(null)

    const questions = [
        {
            number: '101',
            text: 'When she held her last meeting, Ms. Tobal ____ her sales staff to perform even better next quarter.',
            options: [
                { id: 'answer1', label: 'A. asked' },
                { id: 'answer2', label: 'B. told' },
                { id: 'answer3', label: 'C. ordered' },
                { id: 'answer4', label: 'D. commanded' },
            ],
        },
        // Add more questions here
    ]

    useEffect(() => {
        const startVideo = () => {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    videoRef.current.srcObject = stream
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
        let camera
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

            const onResults = (results) => {
                // Simplified face detection logic
                if (
                    results.multiFaceLandmarks &&
                    results.multiFaceLandmarks.length > 0
                ) {
                    // Process face detection results
                    setWarning(false)
                    setCheatingStatus("You're looking straight")
                } else {
                    setWarning(true)
                    setCheatingStatus('Cheating Detected: Face not detected')
                    setCheatAttempts((prevAttempts) => prevAttempts + 1)
                }
            }

            faceMesh.onResults(onResults)

            camera = new Camera(videoRef.current, {
                onFrame: async () => {
                    await faceMesh.send({ image: videoRef.current })
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

    useEffect(() => {
        if (cheatAttempts > 10) {
            alert(
                'You have been detected cheating multiple times. Your exam will be terminated.'
            )
            // Handle exam termination logic here
        }
    }, [cheatAttempts])

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${String(minutes).padStart(2, '0')}:${String(
            remainingSeconds
        ).padStart(2, '0')}`
    }

    const [currentQuestion, setCurrentQuestion] = useState(0)

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <div className="container mx-auto p-4 flex flex-grow">
                <div className="bg-white rounded-lg shadow-md p-8 w-full md:w-2/3">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Exam Content
                        </h2>
                    </div>

                    {/* Display current question */}
                    {questions.map((question, index) => (
                        <div
                            key={index}
                            className={`${
                                index !== currentQuestion ? 'hidden' : ''
                            }`}
                        >
                            <div className="mb-6">
                                <div className="text-lg font-semibold text-gray-800 mb-2">
                                    {question.number}.
                                </div>
                                <div className="text-gray-700">
                                    {question.text}
                                </div>
                                <div className="mt-4 space-y-2">
                                    {question.options.map((option) => (
                                        <div
                                            key={option.id}
                                            className="flex items-center"
                                        >
                                            <input
                                                type="radio"
                                                name={`question-${question.number}`}
                                                id={option.id}
                                                className="mr-2"
                                            />
                                            <label
                                                htmlFor={option.id}
                                                className="text-gray-700"
                                            >
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    className="fixed top-30 rounded-lg right-12 w-1/4 bg-white shadow-lg p-6"
                    style={{ zIndex: 10 }}
                >
                    <div className="text-lg text-gray-600 text-center">
                        Time Left: {formatTime(timeLeft)}
                    </div>
                    <p className="text-base text-gray-600 mb-3 text-center">
                        Mark questions for review
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                        {questions.map((question, index) => (
                            <button
                                key={index}
                                className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${
                                    index === currentQuestion
                                        ? 'bg-blue-300'
                                        : ''
                                }`}
                                onClick={() => setCurrentQuestion(index)}
                            >
                                {question.number}
                            </button>
                        ))}
                    </div>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg mt-4">
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
