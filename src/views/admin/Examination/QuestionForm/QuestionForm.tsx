import { forwardRef, useState } from 'react'
import { FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import hooks from '@/components/ui/hooks'
import StickyFooter from '@/components/shared/StickyFooter'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Form, Formik, FormikProps } from 'formik'
import BasicInformationFields from './BasicInformationFields'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'

type FormikRef = FormikProps<any>

type Option = {
    text: string
    is_correct: boolean
}

type InitialData = {
    text?: string
    points?: number
    subject_id?: string
    difficulty?: number
    options?: Option[]
}

export type FormModel = InitialData

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

type QuestionFormProps = {
    initialData?: InitialData
    type: 'edit' | 'new'
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: FormModel, setSubmitting: SetSubmitting) => void
}

const { useUniqueId } = hooks

const validationSchema = Yup.object().shape({
    text: Yup.string().required('Câu hỏi là bắt buộc'),
    points: Yup.number()
        .required('Điểm là bắt buộc')
        .min(1, 'Điểm phải lớn hơn 0'),
    subject_id: Yup.string().required('Mã môn học là bắt buộc'),
    difficulty: Yup.number().required('Độ khó là bắt buộc'),
    options: Yup.array()
        .of(
            Yup.object().shape({
                text: Yup.string().required('Nội dung lựa chọn là bắt buộc'),
                is_correct: Yup.boolean().required('Đúng/Sai là bắt buộc'),
            })
        )
        .min(2, 'Ít nhất hai lựa chọn là bắt buộc')
        .required('2 Lựa chọn là bắt buộc'),
})

const DeleteProductButton = ({ onDelete }: { onDelete: OnDelete }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        onDelete?.(setDialogOpen)
    }

    return (
        <>
            <Button
                className="text-red-600"
                variant="plain"
                size="sm"
                icon={<HiOutlineTrash />}
                type="button"
                onClick={onConfirmDialogOpen}
            >
                Xóa
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="Xóa câu hỏi"
                confirmButtonColor="red-600"
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
            >
                <p>
                    Bạn có chắc chắn muốn xóa câu hỏi này không? Hành động này
                    không thể hoàn tác.
                </p>
            </ConfirmDialog>
        </>
    )
}

const QuestionForm = forwardRef<FormikRef, QuestionFormProps>((props, ref) => {
    const {
        type,
        initialData = {
            text: '',
            points: 0,
            subject_id: '',
            difficulty: 1,
            options: [], // Ensure that options is initialized as an array
        },
        onFormSubmit,
        onDiscard,
        onDelete,
    } = props

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={initialData} // Ensure initialData contains options array
                validationSchema={validationSchema}
                onSubmit={(values: FormModel, { setSubmitting }) => {
                    const formData = cloneDeep(values)

                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <BasicInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values} // Pass values to ensure proper initialization
                                        setFieldValue={function (
                                            field: string,
                                            value: any,
                                            shouldValidate?: boolean
                                        ): void {
                                            throw new Error(
                                                'Function not implemented.'
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div>
                                    {type === 'edit' && (
                                        <DeleteProductButton
                                            onDelete={onDelete as OnDelete}
                                        />
                                    )}
                                </div>
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        onClick={() => onDiscard?.()}
                                    >
                                        Bỏ qua
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        Lưu
                                    </Button>
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

QuestionForm.displayName = 'QuestionForm'

export default QuestionForm
