import { ConfirmDialog } from '@/components/shared'
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
        <ConfirmDialog
            isOpen={dialogOpen}
            type="danger"
            title="Delete question"
            confirmButtonColor="red-600"
            onCancel={onCancel}
            onConfirm={onConfirm}
        >
            <p>
                Bạn có chắc chắn muốn xóa câu hỏi này không? Hành động này không
                thể hoàn tác.
            </p>
        </ConfirmDialog>
    )
}

export default ConfirmDeleteModal
