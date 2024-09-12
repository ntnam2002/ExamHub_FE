import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteClass,
    useAppDispatch,
    useAppSelector,
    getClassess,
} from '../store'

const ClassDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.ClassesList.data.deleteConfirmation
    )
    const selectedClass = useAppSelector(
        (state) => state.ClassesList.data.selectedClass
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteClass({ id: selectedClass })

        if (success) {
            dispatch(getClassess())
            toast.push(
                <Notification
                    title={'Xóa thành công'}
                    type="success"
                    duration={2500}
                >
                    Xóa lớp học thành công
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            type="danger"
            title="Delete Class"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
                Bạn có chắc chắn muốn xóa lớp học này không? Hành động này không
                thể hoàn tác.
            </p>
        </ConfirmDialog>
    )
}

export default ClassDeleteConfirmation
