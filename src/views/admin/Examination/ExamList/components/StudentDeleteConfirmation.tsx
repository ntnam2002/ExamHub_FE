import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteProduct,
    useAppDispatch,
    useAppSelector,
    getStudents,
} from '../store'

const ProductDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.StudentList.data.deleteConfirmation
    )
    const selectedProduct = useAppSelector(
        (state) => state.StudentList.data.selectedProduct
    )
    const tableData = useAppSelector(
        (state) => state.StudentList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteProduct({ id: selectedProduct })
        
        if (success.status === 'success') {
            dispatch(getStudents())
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Xóa sinh viên thành công
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
            title="Delete product"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
                Bạn có chắc chắn muốn xóa sinh viên này không ? Hành động này
                không thể hoàn tác.
            </p>
        </ConfirmDialog>
    )
}

export default ProductDeleteConfirmation
