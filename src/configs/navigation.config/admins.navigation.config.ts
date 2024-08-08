import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const adminNavigationConfig: NavigationTree[] = [
    {
        key: 'Adminapps',
        path: '',
        title: '',
        translateKey: 'ExamHub',
        icon: '',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN],
        subMenu: [
            // {
            //     key: 'ExamHub.admin.home',
            //     path: `${ADMIN_PREFIX_PATH}/home`,
            //     title: 'Home',
            //     translateKey: 'nav.ExamHub.admin.home',
            //     icon: 'home',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN],
            //     subMenu: [],
            // },
            {
                key: 'ExamHub.admin.student',
                path: `${ADMIN_PREFIX_PATH}/student`,
                title: 'Sinh viên',
                translateKey: 'Sinh viên',
                icon: 'student',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [],
            },
            {
                key: 'ExamHub.admin.question',
                path: `${ADMIN_PREFIX_PATH}/question`,
                title: 'Câu hỏi',
                translateKey: 'Câu hỏi',
                icon: 'question',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [],
            },
            {
                key: 'ExamHub.admin.exam',
                path: `${ADMIN_PREFIX_PATH}/exam`,
                title: 'Bài thi',
                translateKey: 'Bài thi',
                icon: 'book',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [],
            },
            {
                key: 'ExamHub.admin.examination',
                path: `${ADMIN_PREFIX_PATH}/examination`,
                title: 'Kỳ thi',
                translateKey: 'Kỳ thi',
                icon: 'examination',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [],
            },
        ],
    },
]

export default adminNavigationConfig
