import { cloneElement } from 'react'
import Avatar from '@/components/ui/Avatar'
import Logo from '@/components/template/Logo'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'
import examhubLogo from '@/assets/svg/examhub-logo.png'

interface SideProps extends CommonProps {
    content?: React.ReactNode
}

const Side = ({ children, content, ...rest }: SideProps) => {
    return (
        <div className="grid lg:grid-cols-3 h-full">
            <div
                className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex"
                style={{
                    backgroundImage: `url('/img/others/auth-side-bg.jpg')`,
                }}
            >
                <div></div>
                <div>
                    <div className="mb-6 flex items-center gap-4">
                        <img
                            style={{
                                width: '100px',
                                height: '100px',
                            }}
                            src={examhubLogo}
                            alt="ExamHub Logo"
                        />
                        <div>
                            <h1 className="text-4xl text-white font-bold">
                                ExamHub
                            </h1>
                        </div>
                    </div>

                    <p className="text-lg text-white opacity-80">
                        Hệ thống thi trắc nghiệm trực tuyến dành cho học sinh và
                        sinh viên
                    </p>
                </div>
                <span className="text-white"></span>
            </div>
            <div className="col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800">
                <div className="xl:min-w-[450px] px-8">
                    <div className="mb-8">{content}</div>
                    {children
                        ? cloneElement(children as React.ReactElement, {
                              ...rest,
                          })
                        : null}
                </div>
            </div>
        </div>
    )
}

export default Side
