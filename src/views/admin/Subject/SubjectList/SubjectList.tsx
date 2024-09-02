import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import SubjectTable from './components/SubjectTable'
import SubjectTableTools from './components/SubjectTableTools'

injectReducer('SubjectList', reducer)

const SubjectList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Môn học</h3>
                <SubjectTableTools />
            </div>
            <SubjectTable />
        </AdaptableCard>
    )
}

export default SubjectList
