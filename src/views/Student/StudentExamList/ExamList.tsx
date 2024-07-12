import ActionBar from './components/ActionBar'

//import NewProjectDialog from './components/NewProjectDialog'
import Container from '@/components/shared/Container'
import reducer from './store'
import { injectReducer } from '@/store'
import ExamListContent from './components/ExamListContent'

injectReducer('examlist', reducer)

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
