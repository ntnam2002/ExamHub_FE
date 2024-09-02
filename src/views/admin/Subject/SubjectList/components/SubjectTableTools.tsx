import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import SubjectTableSearch from './SubjectTableSearch'
import { Link } from 'react-router-dom'

const SubjectTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <SubjectTableSearch />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/subject-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Xuất file
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/admin/subject/new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Thêm môn học
                </Button>
            </Link>
        </div>
    )
}

export default SubjectTableTools
