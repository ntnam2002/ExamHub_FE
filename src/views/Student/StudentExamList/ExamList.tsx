//import NewProjectDialog from './components/NewProjectDialog'
import Container from '@/components/shared/Container'
import reducer from './store'
import { injectReducer } from '@/store'
import ExamListContent from './components/ExamListContent'
import persistedQuestionReducer from '../Examination/store'

injectReducer('examinationList', reducer)
injectReducer('examinationQuestionList', persistedQuestionReducer)
const ExamList = () => {
    return (
        <Container className="h-full">
            {/* <ActionBar /> */}
            <ExamListContent />
            {/* <NewProjectDialog /> */}
        </Container>
    )
}

export default ExamList
