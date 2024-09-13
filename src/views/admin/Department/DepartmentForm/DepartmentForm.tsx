import { forwardRef } from 'react'
import { FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import StickyFooter from '@/components/shared/StickyFooter'
import { Form, Formik, FormikProps, Field } from 'formik'
import * as Yup from 'yup'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

export type DepartmentFormModel = {
    department_name: string
    name: string
}

export type SetSubmitting = (isSubmitting: boolean) => void

type DepartmentFormProps = {
    type: 'edit' | 'new'
    initialData?: DepartmentFormModel
    onFormSubmit: (
        formData: DepartmentFormModel,
        setSubmitting: SetSubmitting
    ) => void
    onDiscard?: () => void
}

const validationSchema = Yup.object().shape({
    department_name: Yup.string().required('Department Name is required'),
    name: Yup.string().required('name is required'),
})

const DepartmentForm = forwardRef<FormikRef, DepartmentFormProps>(
    (props, ref) => {
        const {
            type,
            initialData = { department_name: '', name: '' },
            onFormSubmit,
            onDiscard,
        } = props

        return (
            <>
                <Formik
                    innerRef={ref}
                    initialValues={initialData}
                    validationSchema={validationSchema}
                    onSubmit={(
                        values: DepartmentFormModel,
                        { setSubmitting }
                    ) => {
                        onFormSubmit(values, setSubmitting)
                    }}
                >
                    {({ touched, errors, isSubmitting }) => (
                        <Form>
                            <FormContainer>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label htmlFor="department_name">
                                            Department Name
                                        </label>
                                        <Field
                                            id="department_name"
                                            name="department_name"
                                            className="input"
                                            type="text"
                                        />
                                        {touched.department_name &&
                                            errors.department_name && (
                                                <div className="error">
                                                    {errors.department_name}
                                                </div>
                                            )}
                                    </div>
                                    <div>
                                        <label htmlFor="name">name</label>
                                        <Field
                                            id="name"
                                            name="name"
                                            className="input"
                                            type="text"
                                        />
                                        {touched.name && errors.name && (
                                            <div className="error">
                                                {errors.name}
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
                                                ? 'Create Department'
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
    }
)

DepartmentForm.displayName = 'DepartmentForm'

export default DepartmentForm
