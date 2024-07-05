import {
    ADMIN_PREFIX_PATH,
    APP_PREFIX_PATH,
    STUDENT_PREFIX_PATH,
} from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN, STUDENT, TEACHER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const studentNavigationConfig: NavigationTree[] = [
    {
        key: 'apps',
        path: '',
        title: 'ExamHub',
        translateKey: 'ExamHub',
        icon: '',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [STUDENT],
        subMenu: [
            {
                key: 'ExamHub.student.home',
                path: `${STUDENT_PREFIX_PATH}/home`,
                title: 'Home',
                translateKey: 'nav.ExamHub.student.home',
                icon: 'home',
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
