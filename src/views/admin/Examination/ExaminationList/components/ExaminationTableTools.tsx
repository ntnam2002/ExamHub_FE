import React, { useState } from 'react'
import { Modal } from 'antd'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import ExaminationForm from './ExaminationForm'
import { Examination } from './types'
import Button from '@/components/ui/Button'

interface ExaminationTableToolsProps {
    onEdit: (examination: Examination) => void
    onSave: (examination: Examination) => void // Add onSave prop
}

const ExaminationTableTools: React.FC<ExaminationTableToolsProps> = ({
    onEdit,
    onSave, // Destructure onSave
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

    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-end">
            <div style={{ display: 'flex' }}>
                {/* <Link
                    download
                    className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                    to="/data/question-list.csv"
                    target="_blank"
                >
                    <Button block size="sm" icon={<HiDownload />}>
                        Xuất file
                    </Button>
                </Link> */}

                <Button
                    block
                    variant="solid"
                    size="sm"
                    icon={<HiPlusCircle />}
                    style={{ backgroundColor: '#4f47e6', color: 'white' }}
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
                    onCancel={handleCloseModal}
                    onSave={onSave} // Pass onSave to ExaminationForm
                />
            </Modal>
        </div>
    )
}

export default ExaminationTableTools
