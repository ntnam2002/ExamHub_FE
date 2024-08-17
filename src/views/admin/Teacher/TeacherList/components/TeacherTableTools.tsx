import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import ProductTableSearch from './TeacherTableSearch'

import { Link } from 'react-router-dom'

const TeacherTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <ProductTableSearch />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/product-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Xuất file
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/admin/teacher/new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Thêm giảng viên
                </Button>
            </Link>
        </div>
    )
}

export default TeacherTableTools
