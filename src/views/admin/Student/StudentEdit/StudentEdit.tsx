import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    useAppSelector,
    useAppDispatch,
    getStudentToEdit,
    updateStudent,
    deleteStudent,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import StudentForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/admin/Student/StudentForm'
import isEmpty from 'lodash/isEmpty'

// Inject the reducer for the student edit slice
injectReducer('StudentEdit', reducer)

const StudentEdit = () => {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    // Get the student data and loading state from the store
    const studentData = useAppSelector(
        (state) => state.StudentEdit.data.StudentData
    )
    const loading = useAppSelector((state) => state.StudentEdit.data.loading)

    // Fetch student data based on the current URL
    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        dispatch(getStudentToEdit({ id: path }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await updateStudent({ id: studentData._id, ...values })
        setSubmitting(false)
        if (success) {
            popNotification('updated')
        }
    }

    const handleDiscard = () => {
        navigate('/admin/student')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deleteStudent({ id: studentData.id })
        if (success) {
            popNotification('deleted')
        }
    }

    const popNotification = (keyword: string) => {
        toast.push(
            <Notification
                title={`Successfully ${keyword}`}
                type="success"
                duration={2500}
            >
                Student successfully {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/admin/student')
    }

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(studentData) && (
                    <>
                        <StudentForm
                            type="edit"
                            initialData={studentData}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(studentData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="Không tìm thấy sinh viên!"
                    />
                    <h3 className="mt-8">Không tìm thấy sinh viên!</h3>
                </div>
            )}
        </>
    )
}

export default StudentEdit
