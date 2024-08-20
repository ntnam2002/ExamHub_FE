import AdaptableCard from '@/components/shared/AdaptableCard'
import ExamList from '@/views/Student/StudentExamList/ExamList'
import ExamLists from './components/Exam'

const Examlist = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Đề thi</h3>
            </div>
            <ExamLists />
        </AdaptableCard>
    )
}

export default Examlist
