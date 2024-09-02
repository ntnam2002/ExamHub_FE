import React from 'react'
import { HiPlusCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'

const ExamTableTools: React.FC = () => {
    return (
        <div className="flex justify-end mb-4">
            <Button
                variant="solid"
                size="sm"
                icon={<HiPlusCircle />}
                style={{ backgroundColor: '#4f47e6', color: 'white' }}
            >
                <Link to="/admin/exam/new" style={{ color: 'white' }}>
                    Tạo bài kiểm tra
                </Link>
            </Button>
        </div>
    )
}

export default ExamTableTools
