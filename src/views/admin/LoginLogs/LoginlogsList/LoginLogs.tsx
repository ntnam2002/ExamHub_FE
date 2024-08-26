import AdaptableCard from '@/components/shared/AdaptableCard'
import ExamList from '@/views/Student/StudentExamList/ExamList'
import { Behavior } from './components/types'
import LoginlogsTable from './components/LoginlogsTable'

const LoginLogs = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Truy cập</h3>
            </div>
            <LoginlogsTable />
        </AdaptableCard>
    )
}

export default LoginLogs
