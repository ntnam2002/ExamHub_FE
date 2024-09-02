import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateUser } from '@/services/AdminService'
import TeacherForm, {
    FormModel,
    SetSubmitting,
} from '../TeacherForm/TeacherForm'

const TeacherNew = () => {
    const navigate = useNavigate()

    const addTeacher = async (data: FormModel) => {
        'data', data
        const response = await apiCreateUser<boolean, FormModel>(data)

        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addTeacher(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Thêm thành công'}
                    type="success"
                    duration={2500}
                >
                    Thêm mới giảng viên thành công
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/admin/teacher')
        }
    }

    const handleDiscard = () => {
        navigate('/admin/teacher')
    }

    return (
        <>
            <TeacherForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default TeacherNew
