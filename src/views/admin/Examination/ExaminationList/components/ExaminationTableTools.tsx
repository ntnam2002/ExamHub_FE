// components/ExaminationTableTools.tsx
import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import ExaminationForm from './ExaminationForm'
import { Examination } from '@/types'
import {
    apiCreateExamination,
    apiUpdateExamination,
} from '@/services/ExamService'

interface ExaminationTableToolsProps {
    onEdit: (examination: Examination) => void
}

const ExaminationTableTools: React.FC<ExaminationTableToolsProps> = ({
    onEdit,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedExamination, setSelectedExamination] =
        useState<Examination | null>(null)

    const handleAddExamination = () => {
        setSelectedExamination(null)
        setIsModalVisible(true)
    }

    const handleCloseModal = () => {
        setIsModalVisible(false)
        setSelectedExamination(null)
    }

    const handleSaveExamination = async (examination: Examination) => {
        try {
            if (selectedExamination) {
                await apiUpdateExamination(selectedExamination._id, examination)
            } else {
                await apiCreateExamination(examination)
            }
            handleCloseModal()
        } catch (error) {
            console.error(`Error updating examination: ${error}`)
        }
    }

    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-end">
            <div style={{ display: 'flex' }}>
                <Link
                    download
                    className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                    to="/data/question-list.csv"
                    target="_blank"
                >
                    <Button block size="large" icon={<HiDownload />}>
                        Xuất file
                    </Button>
                </Link>
                <Button
                    block
                    color="primary"
                    size="large"
                    icon={<HiPlusCircle />}
                    onClick={handleAddExamination}
                >
                    Tạo kỳ thi
                </Button>
            </div>

            <Modal
                title={selectedExamination ? 'Cập nhật kỳ thi' : 'Tạo kỳ thi'}
                open={isModalVisible}
                footer={null} // Remove default footer
                onCancel={handleCloseModal}
            >
                <ExaminationForm
                    examinationToEdit={selectedExamination || undefined}
                    onSave={handleSaveExamination}
                    onCancel={handleCloseModal}
                />
            </Modal>
        </div>
    )
}

export default ExaminationTableTools
