import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'
import { ADMIN } from '@/constants/roles.constant'
import adminNavigationConfig from './admins.navigation.config'
import studentNavigationConfig from './students.navigation.config'

const navigationConfig: NavigationTree[] = [
    ...adminNavigationConfig,
    ...studentNavigationConfig,
]

export default navigationConfig
