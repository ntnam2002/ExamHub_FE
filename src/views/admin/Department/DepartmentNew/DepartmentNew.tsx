import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateDepartment } from '@/services/managementService'
import DepartmentForm, {
    SetSubmitting,
    DepartmentFormModel,
} from '../DepartmentForm'

const DepartmentNew = () => {
    const navigate = useNavigate()

    const addDepartment = async (data: DepartmentFormModel) => {
        const response = await apiCreateDepartment<
            boolean,
            DepartmentFormModel
        >(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: DepartmentFormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addDepartment(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfully added'}
                    type="success"
                    duration={2500}
                >
                    Thêm mới phòng ban thành công
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/admin/department')
        }
    }

    const handleDiscard = () => {
        navigate('/admin/department')
    }

    return (
        <>
            <DepartmentForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default DepartmentNew
