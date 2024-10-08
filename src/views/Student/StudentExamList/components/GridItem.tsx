import React, { useState } from 'react'
import Card from '@/components/ui/Card'
import { HiOutlineClipboardCheck } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'

export type GridItemProps = {
    _id: string
    exam_id?: {
        _id: string
        exam_name: string
        description: string
    }
    total_score: number
    started_at: string
}

const GridItem: React.FC<GridItemProps> = ({
    _id,
    exam_id,
    total_score,
    started_at,
}) => {
    const [error, setError] = useState<string | null>(null)
    const [canNavigate, setCanNavigate] = useState(false)
    const navigate = useNavigate()

    // Check if exam_id or exam_name is missing, then return null to avoid errors
    if (!exam_id || !exam_id.exam_name) {
        return null // Or you can display a different error message
    }

    const { exam_name, description } = exam_id

    const handleClick = async (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault()
        try {
            await navigator.mediaDevices.getUserMedia({ video: true })
            localStorage.setItem('examinationId', _id)
            setCanNavigate(true)
            navigate('/examination/components/exam')
        } catch (err) {
            setError('No camera found. Please connect a camera to proceed.')
        }
    }

    return (
        <Card bodyClass="h-full">
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between">
                    <Link to="#" onClick={handleClick}>
                        <h6>{exam_name}</h6>
                    </Link>
                </div>
                <p className="mt-4">{description}</p>
                <div className="mt-3">
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center rounded-full font-semibold text-xs">
                            <div className="flex items-center px-2 py-1 border border-gray-300 rounded-full">
                                <HiOutlineClipboardCheck className="text-base" />
                                <span className="ml-1 rtl:mr-1 whitespace-nowrap">
                                    Tổng điểm: {total_score}
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className="mt-2 text-sm">
                        Bắt đầu lúc: {new Date(started_at).toLocaleString()}
                    </p>
                </div>
                {error && <p className="mt-2 text-red-500">{error}</p>}
            </div>
        </Card>
    )
}

export default GridItem
