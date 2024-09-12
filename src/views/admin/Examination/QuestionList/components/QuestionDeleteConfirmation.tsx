import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteQuestion,
    useAppDispatch,
    useAppSelector,
    getQuestions,
} from '../store'

const QuestionDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.questionList.data.deleteConfirmation
    )
    const selectedQuestion = useAppSelector(
        (state) => state.questionList.data.selectedQuestion
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteQuestion({ id: selectedQuestion })

        if (success.status === 'success') {
            dispatch(getQuestions())
            toast.push(
                <Notification
                    title={'Xoá thành công'}
                    type="success"
                    duration={2500}
                >
                    Xóa câu hỏi thành công
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
            title="Delete question"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
                Bạn có chắc chắn muốn xóa câu hỏi này không? Hành động này không
                thể hoàn tác.
            </p>
        </ConfirmDialog>
    )
}

export default QuestionDeleteConfirmation
