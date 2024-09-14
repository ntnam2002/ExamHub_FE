import { useEffect, useState } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useLocation, useNavigate } from 'react-router-dom'

import isEmpty from 'lodash/isEmpty'
import QuestionForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '../QuestionForm/QuestionForm'
import {
    apiDeleteQuestion,
    apiGetQuestionById,
    apiUpdateQuestion,
} from '@/services/ExamService'

const QuestionEdit = () => {
    const [questionData, setQuestionData] = useState<FormModel | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const location = useLocation()
    const navigate = useNavigate()

    const fetchData = async (id: string) => {
        setLoading(true)
        try {
            const response = await apiGetQuestionById({ id })
            setQuestionData(response.data)
        } catch (error) {
            console.error('Failed to fetch question data', error)
        } finally {
            setLoading(false)
        }
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        console.log('values', values)
        try {
            await apiUpdateQuestion(values)
            popNotification('updated')
        } catch (error) {
            console.error('Failed to update question', error)
        } finally {
            setSubmitting(false)
        }
    }

    const handleDiscard = () => {
        navigate('/admin/question')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        try {
            await apiDeleteQuestion(questionData?.id)
            popNotification('deleted')
        } catch (error) {
            console.error('Failed to delete question', error)
        }
    }

    const popNotification = (keyword: string) => {
        toast.push(
            <Notification
                title={`Successfully ${keyword}`}
                type="success"
                duration={2500}
            >
                Question successfully {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/admin/question')
    }

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        fetchData(path)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(questionData) && (
                    <>
                        <QuestionForm
                            type="edit"
                            initialData={questionData}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(questionData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="Không tìm thấy câu hỏi!"
                    />
                    <h3 className="mt-8">Không tìm thấy câu hỏi!</h3>
                </div>
            )}
        </>
    )
}

export default QuestionEdit
