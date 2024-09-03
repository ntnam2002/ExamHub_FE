import { Card, Modal } from 'antd'
import React from 'react'

interface ConfirmDeleteModalProps {
    show: boolean
    onConfirm: () => void
    onCancel: () => void
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
    show,
    onConfirm,
    onCancel,
}) => {
    if (!show) return null

    return (
        <Card className="modal">
            <div className="modal-content">
                <h3>Are you sure you want to delete this exam?</h3>
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
        </Card>
    )
}

export default ConfirmDeleteModal
