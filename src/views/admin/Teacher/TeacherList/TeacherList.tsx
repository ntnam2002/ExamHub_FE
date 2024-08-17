import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ProductTable from './components/TeacherTable'
import TeacherTableTools from './components/TeacherTableTools'

injectReducer('TeacherList', reducer)

const TeacherList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Giảng viên</h3>
                <TeacherTableTools />
            </div>
            <ProductTable />
        </AdaptableCard>
    )
}

export default TeacherList
