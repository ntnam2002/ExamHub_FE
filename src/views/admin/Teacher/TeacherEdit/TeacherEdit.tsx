import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    useAppSelector,
    useAppDispatch,
    getTeacherToEdit,
    updateTeacher,
    deleteTeacher,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import isEmpty from 'lodash/isEmpty'
import TeacherForm, {
    FormModel,
    OnDeleteCallback,
    SetSubmitting,
} from '../TeacherForm'

// Inject the reducer for the student edit slice
injectReducer('TeacherEdit', reducer)

const TeacherEdit = () => {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    // Get the student data and loading state from the store
    const teacherData = useAppSelector(
        (state) => state.TeacherEdit.data.TeacherData
    )
    const loading = useAppSelector((state) => state.TeacherEdit.data.loading)

    // Fetch student data based on the current URL
    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        dispatch(getTeacherToEdit({ id: path }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await updateTeacher({ id: teacherData._id, ...values })
        setSubmitting(false)
        if (success) {
            popNotification('updated')
        }
    }

    const handleDiscard = () => {
        navigate('/admin/teacher')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deleteTeacher({ id: teacherData.id })
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
        navigate('/admin/teacher')
    }

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(teacherData) && (
                    <>
                        <TeacherForm
                            type="edit"
                            initialData={teacherData}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(teacherData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="Không tìm thấy sinh viên!"
                    />
                    <h3 className="mt-8">Không tìm thấy giảng viên!</h3>
                </div>
            )}
        </>
    )
}

export default TeacherEdit
