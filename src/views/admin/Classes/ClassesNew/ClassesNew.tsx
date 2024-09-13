import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateClass, apiCreateUser } from '@/services/AdminService'
import ClassForm, {
    SetSubmitting,
    ClassFormModel,
} from '../ClassesForm/ClassesForm'

const ClassesNew = () => {
    const navigate = useNavigate()

    const addClass = async (data: ClassFormModel) => {
        const response = await apiCreateClass<boolean, ClassFormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: ClassFormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addClass(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfully added'}
                    type="success"
                    duration={2500}
                >
                    Thêm mới lớp học thành công
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/admin/class')
        }
    }

    const handleDiscard = () => {
        navigate('/admin/class')
    }

    return (
        <>
            <ClassForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default ClassesNew
