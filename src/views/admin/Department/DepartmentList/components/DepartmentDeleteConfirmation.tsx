import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteDepartment,
    useAppDispatch,
    useAppSelector,
    getDepartments,
} from '../store'

const DepartmentDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.DepartmentList.data.deleteConfirmation
    )
    const selectedDepartment = useAppSelector(
        (state) => state.DepartmentList.data.selectedDepartment
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteDepartment({ id: selectedDepartment })

        if (success.status === 'success') {
            dispatch(getDepartments())
            toast.push(
                <Notification
                    title={'Successfully Deleted'}
                    type="success"
                    duration={2500}
                >
                    Xóa khoa thành công
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
            title="Delete Department"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
                Bạn có chắc chắn muốn xóa khoa này không? Hành động này không
                thể hoàn tác.
            </p>
        </ConfirmDialog>
    )
}

export default DepartmentDeleteConfirmation
