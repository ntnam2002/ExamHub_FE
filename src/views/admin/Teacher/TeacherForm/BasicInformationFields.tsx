import React, { useEffect, useState } from 'react'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { Select } from '@/components/ui'
import { apiGetAllClasses } from '@/services/ExamService'
import { apiGetAllDepartment } from '@/services/AdminService'

type FormFieldsName = {
    username: string
    password: string
    name: string
    email: string
    class_ids: string
    department_id: string
}

type BasicInformationFieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}

const BasicInformationFields = (props: BasicInformationFieldsProps) => {
    const { touched, errors } = props

    const [departments, setDepartments] = useState<
        { department_name: string; _id: string }[]
    >([])
    const [classes, setClasses] = useState<
        { class_name: string; _id: string }[]
    >([])

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await apiGetAllDepartment()
                setDepartments(response.data)
            } catch (error) {
                console.error('Failed to fetch departments:', error)
            }
        }

        const fetchClasses = async () => {
            try {
                const response = await apiGetAllClasses()
                setClasses(response.data)
            } catch (error) {
                console.error('Failed to fetch classes:', error)
            }
        }

        fetchDepartments()
        fetchClasses()
    }, [])

    return (
        <>
            <FormItem
                label="Tên đăng nhập"
                invalid={(errors.username && touched.username) as boolean}
                errorMessage={errors.username}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="username"
                    placeholder="VD: 1234567890"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Mật khẩu"
                invalid={(errors.password && touched.password) as boolean}
                errorMessage={errors.password}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="password"
                    placeholder="VD: 123"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Tên"
                invalid={(errors.name && touched.name) as boolean}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    placeholder="Họ và Tên"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Email"
                invalid={(errors.email && touched.email) as boolean}
                errorMessage={errors.email}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Mã lớp"
                invalid={(errors.class_ids && touched.class_ids) as boolean}
                errorMessage={errors.class_ids}
            >
                <Field name="class_ids">
                    {({ field, form }: FieldProps) => (
                        <Select
                            options={classes?.map((cls) => ({
                                label: cls.class_name,
                                value: cls._id,
                            }))}
                            placeholder="Chọn mã lớp"
                            onChange={(option) =>
                                form.setFieldValue(field.name, option?.value)
                            }
                        />
                    )}
                </Field>
            </FormItem>
            <FormItem
                label="Mã khoa"
                invalid={
                    (errors.department_id && touched.department_id) as boolean
                }
                errorMessage={errors.department_id}
            >
                <Field name="department_id">
                    {({ field, form }: FieldProps) => (
                        <Select
                            options={departments?.map((dept) => ({
                                label: dept.department_name,
                                value: dept._id,
                            }))}
                            placeholder="Chọn mã khoa"
                            onChange={(option) =>
                                form.setFieldValue(field.name, option?.value)
                            }
                        />
                    )}
                </Field>
            </FormItem>
        </>
    )
}

export default BasicInformationFields
