import Dropdown from '@/components/ui/Dropdown'
import {
    HiOutlineSwitchHorizontal,
    HiOutlineFlag,
    HiOutlineCog,
} from 'react-icons/hi'
import { MdDeleteForever } from 'react-icons/md'
import EllipsisButton from '@/components/shared/EllipsisButton'

const dropdownList = [
    { label: 'Xóa kỳ thi', value: 'addFlag', icon: <MdDeleteForever /> },
]

const ItemDropdown = () => {
    return (
        <Dropdown placement="bottom-end" renderTitle={<EllipsisButton />}>
            {dropdownList.map((item) => (
                <Dropdown.Item key={item.value} eventKey={item.value}>
                    <span className="text-lg">{item.icon}</span>
                    <span className="ml-2 rtl:mr-2">{item.label}</span>
                </Dropdown.Item>
            ))}
        </Dropdown>
    )
}

export default ItemDropdown
