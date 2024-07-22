import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import QuestionTableSearch from './QuestionTableSearch'
import { Link } from 'react-router-dom'

const QuestionTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <QuestionTableSearch />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/question-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Xuất file
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/admin/question/new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Thêm câu hỏi
                </Button>
            </Link>
        </div>
    )
}

export default QuestionTableTools
