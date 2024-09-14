import {
    FieldArray,
    Field,
    FormikTouched,
    FormikErrors,
    FieldProps,
} from 'formik'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Select } from '@/components/ui' // Đảm bảo Option được import nếu nó là một phần của các thành phần UI của bạn
import AdaptableCard from '@/components/shared/AdaptableCard'
import { apiGetAllSubject } from '@/services/managementService'
import { useEffect, useState } from 'react'

const difficultyOptions = [
    { value: 1, label: 'Dễ' },
    { value: 2, label: 'Vừa' },
    { value: 3, label: 'Khó' },
]

type OptionType = {
    text: string
    is_correct: boolean
}

type SubjectType = {
    _id: string
    subject_name: string
}

type FormFieldsName = {
    text: string
    points: number
    subject_id: string
    difficulty: number
    options: OptionType[]
}

type BasicInformationFieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: FormFieldsName // Truyền values như một prop
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

const BasicInformationFields = (props: BasicInformationFieldsProps) => {
    const { touched, errors, values, setFieldValue } = props
    const [subjects, setSubjects] = useState<SubjectType[]>([])

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await apiGetAllSubject()
                setSubjects(response.data)
            } catch (error) {
                console.error('Không thể lấy danh sách môn học', error)
            }
        }
        fetchSubjects()
    }, [])

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Thông tin câu hỏi</h5>
            <p className="mb-6">Nhập thông tin câu hỏi</p>

            <FormItem
                label="Câu hỏi"
                invalid={!!(errors.text && touched.text)}
                errorMessage={errors.text}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="text"
                    placeholder="VD: Thủ đô của Nhật Bản là gì?"
                    component={Input}
                />
            </FormItem>

            <FormItem
                label="Điểm số"
                invalid={!!(errors.points && touched.points)}
                errorMessage={errors.points}
            >
                <Field
                    type="number"
                    autoComplete="off"
                    name="points"
                    placeholder="VD: 10"
                    component={Input}
                />
            </FormItem>

            <FormItem
                label="Mã môn học"
                invalid={!!(errors.subject_id && touched.subject_id)}
                errorMessage={errors.subject_id}
            >
                <Field name="subject_id">
                    {({ field, form }: FieldProps) => (
                        <Select
                            options={subjects.map((subject) => ({
                                label: subject.subject_name,
                                value: subject._id,
                            }))}
                            placeholder="Chọn môn học"
                            onChange={(option) =>
                                form.setFieldValue(field.name, option?.value)
                            }
                        />
                    )}
                </Field>
            </FormItem>

            <FormItem
                label="Độ khó"
                invalid={!!(errors.difficulty && touched.difficulty)}
                errorMessage={errors.difficulty}
            >
                <Field name="difficulty">
                    {({ field, form }: FieldProps) => (
                        <Select
                            value={
                                difficultyOptions.find(
                                    (option) => option.value === field.value
                                ) || null
                            }
                            options={difficultyOptions}
                            placeholder="Chọn độ khó"
                            onChange={(option) =>
                                form.setFieldValue(field.name, option?.value)
                            }
                        />
                    )}
                </Field>
            </FormItem>

            <FormItem
                label="Tùy chọn"
                invalid={!!(errors.options && touched.options)}
                errorMessage={errors.options?.[0]?.text}
            >
                <FieldArray name="options">
                    {({ remove, push }) => (
                        <div>
                            {values.options.map((option, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-2 mb-2"
                                >
                                    <Field
                                        name={`options.${index}.text`}
                                        placeholder={`Lựa chọn ${index + 1}`}
                                        component={Input}
                                    />
                                    <Field
                                        type="checkbox"
                                        name={`options.${index}.is_correct`}
                                    />
                                    <Button
                                        type="button"
                                        className="text-red-500"
                                        onClick={() => remove(index)}
                                    >
                                        Xóa
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                className="mt-2"
                                onClick={() =>
                                    push({ text: '', is_correct: false })
                                }
                            >
                                Thêm lựa chọn
                            </Button>
                        </div>
                    )}
                </FieldArray>
            </FormItem>
        </AdaptableCard>
    )
}

export default BasicInformationFields
