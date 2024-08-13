import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import DepartmentTableSearch from './DepartmentTableSearch'
import { Link } from 'react-router-dom'

const DepartmentTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <DepartmentTableSearch />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/department-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Xuất file
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/admin/department/new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Thêm khoa
                </Button>
            </Link>
        </div>
    )
}

export default DepartmentTableTools
