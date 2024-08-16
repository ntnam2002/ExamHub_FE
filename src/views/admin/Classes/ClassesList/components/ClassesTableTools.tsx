import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import ClassesTableSearch from './ClassesTableSearch'
import { Link } from 'react-router-dom'

const ClassesTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <ClassesTableSearch />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/classes-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Xuất file
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/admin/class/new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Thêm lớp học
                </Button>
            </Link>
        </div>
    )
}

export default ClassesTableTools
