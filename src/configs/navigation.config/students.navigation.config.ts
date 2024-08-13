import { STUDENT_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { STUDENT } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const studentNavigationConfig: NavigationTree[] = [
    {
        key: 'apps',
        path: '',
        title: '',
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [STUDENT],
        subMenu: [
            {
                key: 'ExamHub.student.statistics',
                path: `${STUDENT_PREFIX_PATH}/statistics`,
                title: 'Thống kê',
                translateKey: 'Thống kê',
                icon: 'statistics',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [STUDENT],
                subMenu: [],
            },
            {
                key: 'ExamHub.student.exam',
                path: `${STUDENT_PREFIX_PATH}/exam`,
                title: 'Kỳ thi',
                translateKey: 'nav.ExamHub.student.exam',
                icon: 'book',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [STUDENT],
                subMenu: [],
            },
        ],
    },
]

export default studentNavigationConfig
