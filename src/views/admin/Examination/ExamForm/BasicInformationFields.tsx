import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { Select } from '@/components/ui'

type FormFieldsName = {
    UserName: string
    PassWord: string
    Email: string
    ClassID: string
    DepartmentId: string
}

type BasicInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}

const ClassID = {
    value: '1',
    label: '1',
}

const BasicInformationFields = (props: BasicInformationFields) => {
    const { touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Thông tin sinh viên</h5>
            <p className="mb-6">Nhập thông tin sinh viên</p>
            <FormItem
                label="Tên đăng nhập"
                invalid={(errors.UserName && touched.UserName) as boolean}
                errorMessage={errors.UserName}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    placeholder="VD: 1234567890"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Mật khẩu"
                invalid={(errors.PassWord && touched.PassWord) as boolean}
                errorMessage={errors.PassWord}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="PassWord"
                    placeholder="VD: 123"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Email"
                invalid={(errors.Email && touched.Email) as boolean}
                errorMessage={errors.Email}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="Email"
                    placeholder="Email"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Mã lớp"
                invalid={(errors.ClassID && touched.ClassID) as boolean}
                errorMessage={errors.ClassID}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="ClassID"
                    placeholder="VD: 123"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Category"
                invalid={(errors.ClassID && touched.ClassID) as boolean}
                errorMessage={errors.ClassID}
            >
                <Field name="category">
                    {({ field, form }: FieldProps) => (
                        <Select
                            field={field}
                            form={form}
                            options={ClassID}
                            value={categories.filter(
                                (category) => category.value === values.category
                            )}
                            onChange={(option) =>
                                form.setFieldValue(field.name, option?.value)
                            }
                        />
                    )}
                </Field>
            </FormItem>
            {/* <FormItem
                label="Description"
                labelClass="!justify-start"
                invalid={(errors.description && touched.description) as boolean}
                errorMessage={errors.description}
            >
                <Field name="description">
                    {({ field, form }: FieldProps) => (
                        <RichTextEditor
                            value={field.value}
                            onChange={(val) =>
                                form.setFieldValue(field.name, val)
                            }
                        />
                    )}
                </Field>
            </FormItem> */}
        </AdaptableCard>
    )
}

export default BasicInformationFields
