import { ADMIN_PREFIX_PATH, APP_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN, STUDENT, TEACHER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const adminNavigationConfig: NavigationTree[] = [
    {
        key: 'apps',
        path: '',
        title: 'ExamHub',
        translateKey: 'ExamHub',
        icon: '',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN],
        subMenu: [
            {
                key: 'ExamHub.admin.home',
                path: `${ADMIN_PREFIX_PATH}/home`,
                title: 'Home',
                translateKey: 'nav.ExamHub.admin.home',
                icon: 'home',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [],
            },
            {
                key: 'ExamHub.admin.student',
                path: `${ADMIN_PREFIX_PATH}/student`,
                title: 'Sinh viên',
                translateKey: 'nav.ExamHub.admin.student',
                icon: 'student',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [],
            },
        ],
    },
]

export default adminNavigationConfig
