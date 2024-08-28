import { Camera } from '@mediapipe/camera_utils'
import { FaceDetection, Results } from '@mediapipe/face_detection'
import React, {
    useEffect,
    useRef,
    useState,
    useImperativeHandle,
    forwardRef,
    useCallback,
} from 'react'
import { toast } from 'react-toastify'
import Webcam from 'react-webcam'
import {
    detectCheating,
    extractFaceCoordinates,
    getCheatingStatus,
} from '../face-detection/face-detection-helper'
import classes from './exam-camera.module.scss'

interface ExamCameraProps {
    ref: any
}

const ExamCamera: React.FC<ExamCameraProps> = forwardRef((props, ref) => {
    const webcamRef = useRef<Webcam>(null)
    const faceDetectionRef = useRef<FaceDetection | null>(null)
    const cameraRef = useRef<Camera | null>(null)
    const realtimeDetection = useRef(true)

    const frameRefresh = useRef(30)
    const currentFrame = useRef(0)

    const [cheatingInfo, setCheatingInfo] = useState({
        status: '',
        caution: '',
        alert: false,
        count: 0,
    })

    const consecutiveCheatingDetections = useRef(0)
    const CHEATING_THRESHOLD = 2

    const handleCloseWarning = useCallback(() => {
        setCheatingInfo((prev) => ({
            ...prev,
            alert: false,
            count: prev.alert ? prev.count + 1 : prev.count,
        }))
    }, [])

    const onResult = useCallback((result: Results) => {
        let warning = false
        let cautionMessage = ''

        if (result.detections.length < 1) {
            warning = true
            cautionMessage =
                'Không phát hiện được khuôn mặt, có thể bị coi là gian lận!'
        } else if (result.detections.length > 1) {
            warning = true
            cautionMessage =
                'Phát hiện nhiều khuôn mặt, có thể bị coi là gian lận!'
        }

        if (!warning) {
            const faceCoordinates = extractFaceCoordinates(result)
            const [lookingLeft, lookingRight] = detectCheating(
                faceCoordinates,
                false
            )
            const currentCheatingStatus = getCheatingStatus(
                lookingLeft,
                lookingRight
            )

            if (currentCheatingStatus !== 'Bình thường!') {
                consecutiveCheatingDetections.current += 1
            } else {
                consecutiveCheatingDetections.current = 0
            }

            if (consecutiveCheatingDetections.current >= CHEATING_THRESHOLD) {
                setCheatingInfo((prev) => ({
                    ...prev,
                    status: currentCheatingStatus,
                    caution: currentCheatingStatus,
                    alert: true,
                }))
            } else {
                setCheatingInfo((prev) => ({
                    ...prev,
                    status: 'Bình thường!',
                    alert: false,
                }))
            }
        } else {
            setCheatingInfo((prev) => ({
                ...prev,
                caution: cautionMessage,
                alert: warning,
            }))
        }
    }, [])

    useEffect(() => {
        const faceDetection = new FaceDetection({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`
            },
        })

        faceDetection.setOptions({
            minDetectionConfidence: 0.5,
            model: 'short',
        })

        faceDetection.onResults(onResult)
        faceDetectionRef.current = faceDetection

        if (webcamRef.current && webcamRef.current.video) {
            const camera = new Camera(webcamRef.current.video, {
                onFrame: async () => {
                    if (!realtimeDetection.current) return

                    currentFrame.current += 1

                    if (currentFrame.current >= frameRefresh.current) {
                        currentFrame.current = 0
                        await faceDetection.send({
                            image: webcamRef.current?.video as HTMLVideoElement,
                        })
                    }
                },
                width: 1280,
                height: 720,
            })

            camera.start()
            cameraRef.current = camera
        }

        return () => {
            faceDetection.close()
            cameraRef.current?.stop()
        }
    }, [onResult])

    useImperativeHandle(ref, () => ({
        stopCamera: () => {
            cameraRef.current?.stop()
        },
    }))

    useEffect(() => {
        if (cheatingInfo.count >= 10) {
            toast.error(
                'Bạn đã gian lận quá số lần, hệ thống sẽ kết thúc bài thi!'
            )
            setTimeout(() => {
                window.location.reload()
            }, 5000)
        }
    }, [cheatingInfo.count])

    return (
        <div className={classes.cameraContainer}>
            <p className={classes.cheatingStatus}>{cheatingInfo.status}</p>

            <Webcam
                ref={webcamRef}
                className={classes.camera}
                screenshotFormat="image/jpeg"
            />

            <br />
            {cheatingInfo.alert && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <p className="text-red-600 font-bold mb-4">Cảnh báo!</p>
                        <p className="text-gray-700 mb-4">
                            {cheatingInfo.caution}
                        </p>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={handleCloseWarning}
                        >
                            Tôi đã hiểu!
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
})

ExamCamera.displayName = 'ExamCamera'

export default ExamCamera
