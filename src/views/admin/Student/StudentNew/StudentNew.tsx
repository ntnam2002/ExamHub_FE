import StudentForm, {
    FormModel,
    SetSubmitting,
} from '@/views/admin/Student/StudentForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateUser } from '@/services/AdminService'

const StudentNew = () => {
    const navigate = useNavigate()

    const addStudent = async (data: FormModel) => {
        const response = await apiCreateUser<boolean, FormModel>(data)

        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addStudent(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Thêm mới sinh viên thành công
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/admin/student')
        }
    }

    const handleDiscard = () => {
        navigate('/admin/student')
    }

    return (
        <>
            <StudentForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default StudentNew
