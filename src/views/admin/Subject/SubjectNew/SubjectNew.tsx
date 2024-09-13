import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateUser } from '@/services/AdminService'
import SubjectForm, { SetSubmitting, SubjectFormModel } from '../SubjectForm'
import { apiCreateSubject } from '@/services/managementService'

const SubjectNew = () => {
    const navigate = useNavigate()

    const addSubject = async (data: SubjectFormModel) => {
        const response = await apiCreateSubject<boolean, SubjectFormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: SubjectFormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addSubject(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfully added'}
                    type="success"
                    duration={2500}
                >
                    Thêm mới môn học thành công
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/admin/subject')
        }
    }

    const handleDiscard = () => {
        navigate('/admin/subject')
    }

    return (
        <>
            <SubjectForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default SubjectNew
