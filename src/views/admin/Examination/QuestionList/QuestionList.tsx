import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ProductTable from './components/QuestionTable'
import ProductTableTools from './components/QuestionTableTools'

injectReducer('questionList', reducer)

const QuestionList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Câu hỏi</h3>
                <ProductTableTools />
            </div>
            <ProductTable />
        </AdaptableCard>
    )
}

export default QuestionList
