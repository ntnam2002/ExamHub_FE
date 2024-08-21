import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import QuestionTable from './components/QuestionTable'
import QuestionTableTools from './components/QuestionTableTools'

injectReducer('questionList', reducer)

const QuestionList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Câu hỏi</h3>
                <QuestionTableTools />
            </div>
            <QuestionTable />
        </AdaptableCard>
    )
}

export default QuestionList
