import { forwardRef } from 'react'
import { FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import StickyFooter from '@/components/shared/StickyFooter'
import { Form, Formik, FormikProps, Field } from 'formik'
import * as Yup from 'yup'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

export type ClassFormModel = {
    class_name: string
    specialization: string
}

export type SetSubmitting = (isSubmitting: boolean) => void

type ClassFormProps = {
    type: 'edit' | 'new'
    initialData?: ClassFormModel
    onFormSubmit: (
        formData: ClassFormModel,
        setSubmitting: SetSubmitting
    ) => void
    onDiscard?: () => void
}

const validationSchema = Yup.object().shape({
    class_name: Yup.string().required('Class Name is required'),
    specialization: Yup.string().required('Specialization is required'),
})

const ClassForm = forwardRef<FormikRef, ClassFormProps>((props, ref) => {
    const {
        type,
        initialData = { class_name: '', specialization: '' },
        onFormSubmit,
        onDiscard,
    } = props

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={initialData}
                validationSchema={validationSchema}
                onSubmit={(values: ClassFormModel, { setSubmitting }) => {
                    onFormSubmit(values, setSubmitting)
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label htmlFor="class_name">
                                        Class Name
                                    </label>
                                    <Field
                                        id="class_name"
                                        name="class_name"
                                        className="input"
                                        type="text"
                                    />
                                    {touched.class_name &&
                                        errors.class_name && (
                                            <div className="error">
                                                {errors.class_name}
                                            </div>
                                        )}
                                </div>
                                <div>
                                    <label htmlFor="specialization">
                                        Specialization
                                    </label>
                                    <Field
                                        id="specialization"
                                        name="specialization"
                                        className="input"
                                        type="text"
                                    />
                                    {touched.specialization &&
                                        errors.specialization && (
                                            <div className="error">
                                                {errors.specialization}
                                            </div>
                                        )}
                                </div>
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        onClick={() => onDiscard?.()}
                                    >
                                        Discard
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        type="submit"
                                    >
                                        {type === 'new'
                                            ? 'Create Class'
                                            : 'Save Changes'}
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

ClassForm.displayName = 'ClassForm'

export default ClassForm
