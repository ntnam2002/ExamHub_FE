import { APP_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN, STUDENT, TEACHER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const appsNavigationConfig: NavigationTree[] = [
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
                key: 'appsProject.home',
                path: '/home',
                title: 'Home',
                translateKey: 'nav.appsProject.home',
                icon: 'home',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [],
            },
            {
                key: 'appsProject.exam',
                path: `${APP_PREFIX_PATH}/project/project-list`,
                title: 'Exam',
                translateKey: 'nav.appsProject.projectList',
                icon: 'book',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [],
            },
        ],
    },
]

export default appsNavigationConfig
