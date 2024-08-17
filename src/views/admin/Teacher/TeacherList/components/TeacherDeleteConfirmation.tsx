import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
    getTeachers,
    deleteTeacher,
} from '../store'

const TeacherDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.TeacherList.data.deleteConfirmation
    )
    const selectedTeacher = useAppSelector(
        (state) => state.TeacherList.data.selectedTeacher
    )
    const tableData = useAppSelector(
        (state) => state.TeacherList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await dispatch(deleteTeacher({ id: selectedTeacher }))

        if (success.meta.requestStatus === 'fulfilled') {
            dispatch(getTeachers())
            toast.push(
                <Notification
                    title={'Successfully Deleted'}
                    type="success"
                    duration={2500}
                >
                    Xóa Giảng viên thành công
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
            title="Delete Teacher"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
                Bạn có chắc chắn muốn xóa Giảng viên này không? Hành động này
                không thể hoàn tác.
            </p>
        </ConfirmDialog>
    )
}

export default TeacherDeleteConfirmation
