import AdaptableCard from '@/components/shared/AdaptableCard'
import ExamList from '@/views/Student/StudentExamList/ExamList'
import { Behavior } from './components/types'
import BehaviorTable from './components/BehaviorTable'

const Examlist = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Hành vi</h3>
            </div>
            <BehaviorTable />
        </AdaptableCard>
    )
}

export default Examlist
