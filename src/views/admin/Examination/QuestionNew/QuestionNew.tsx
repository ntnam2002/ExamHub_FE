import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateQuestion } from '@/services/ExamService'
import QuestionForm, {
    FormModel,
    SetSubmitting,
} from '../QuestionForm/QuestionForm'

const QuestionNew = () => {
    const navigate = useNavigate()

    const addQuestion = async (data: FormModel) => {
        const response = await apiCreateQuestion<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addQuestion(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfully added'}
                    type="success"
                    duration={2500}
                >
                    Thêm mới câu hỏi thành công
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('admin/exam/question')
        }
    }

    const handleDiscard = () => {
        navigate('admin/exam/question')
    }

    return (
        <>
            <QuestionForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default QuestionNew
