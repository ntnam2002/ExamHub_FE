import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ProductTable from './components/StudentTable'
import StudentTableTools from './components/StudentTableTools'

injectReducer('StudentList', reducer)

const StudentList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Sinh viên</h3>
                <StudentTableTools />
            </div>
            <ProductTable />
        </AdaptableCard>
    )
}

export default StudentList
