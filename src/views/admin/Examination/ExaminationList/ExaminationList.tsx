import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ExaminationTable from './components/Examination'

injectReducer('StudentList', reducer)

const ExaminationList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Kỳ thi</h3>
            </div>
            <ExaminationTable />
        </AdaptableCard>
    )
}

export default ExaminationList
