import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteSubject,
    useAppDispatch,
    useAppSelector,
    getSubjects,
} from '../store'

const SubjectDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.SubjectList.data.deleteConfirmation
    )
    const selectedSubject = useAppSelector(
        (state) => state.SubjectList.data.selectedSubject
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteSubject({ id: selectedSubject })

        if (success.status === 'success') {
            dispatch(getSubjects())
            toast.push(
                <Notification
                    title={'Successfully Deleted'}
                    type="success"
                    duration={2500}
                >
                    Xóa môn học thành công
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
            title="Delete Subject"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
                Bạn có chắc chắn muốn xóa môn học này không? Hành động này không
                thể hoàn tác.
            </p>
        </ConfirmDialog>
    )
}

export default SubjectDeleteConfirmation
