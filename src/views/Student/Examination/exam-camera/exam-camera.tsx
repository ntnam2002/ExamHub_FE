import { Camera } from '@mediapipe/camera_utils'
import { FaceDetection, Results } from '@mediapipe/face_detection'
import React, {
    useEffect,
    useRef,
    useState,
    useImperativeHandle,
    forwardRef,
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
    const [img_, setImg_] = useState<string>()
    const webcamRef = useRef<Webcam>(null)
    const faceDetectionRef = useRef<FaceDetection | null>(null)
    const cameraRef = useRef<Camera | null>(null)
    const realtimeDetection = true

    const frameRefresh = 30
    const currentFrame = useRef(0)

    const [cheatingStatus, setCheatingStatus] = useState('')
    const [warning, setWarning] = useState(false)
    useEffect(() => {
        const faceDetection: FaceDetection = new FaceDetection({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`
            },
        })

        faceDetection.setOptions({
            minDetectionConfidence: 0.5,
            model: 'short',
        })

        function onResult(result: Results) {
            if (result.detections.length < 1) {
                setWarning(true)
                setCheatingStatus(
                    'Không phát hiện được khuôn mặt, có thể bị coi là gian lận!'
                )
                return
            } else if (result.detections.length > 1) {
                setWarning(true)
                setCheatingStatus(
                    'Phát hhện nhiều khuôn mặt, có thể bị coi là gian lận!'
                )
                return
            }

            const faceCoordinates = extractFaceCoordinates(result)

            const [lookingLeft, lookingRight] = detectCheating(
                faceCoordinates,
                false
            )

            const cheatingStatus = getCheatingStatus(lookingLeft, lookingRight)
            setCheatingStatus(cheatingStatus)
        }

        faceDetection.onResults(onResult)
        faceDetectionRef.current = faceDetection

        if (webcamRef.current && webcamRef.current.video) {
            const camera = new Camera(webcamRef.current.video, {
                onFrame: async () => {
                    if (!realtimeDetection) {
                        return
                    }

                    currentFrame.current += 1

                    if (currentFrame.current >= frameRefresh) {
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
    }, [webcamRef, realtimeDetection])

    useImperativeHandle(ref, () => ({
        stopCamera: () => {
            cameraRef.current?.stop()
        },
    }))

    return (
        <div className={classes.cameraContainer}>
            <p className={classes.cheatingStatus}>{cheatingStatus}</p>

            <Webcam
                ref={webcamRef}
                className={classes.camera}
                screenshotFormat="image/jpeg"
            />

            <br />
            {warning && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <p className="text-red-600 font-bold mb-4">Cảnh báo!</p>
                        <p className="text-gray-700 mb-4">{cheatingStatus}</p>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            Tôi đã hiểu!
                        </button>
                    </div>
                </div>
            )}
            {img_ && <img src={img_} alt="Profile" />}
        </div>
    )
})

ExamCamera.displayName = 'ExamCamera'

export default ExamCamera
