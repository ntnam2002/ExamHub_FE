import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'
import { STUDENT } from '@/constants/roles.constant'

import appsNavigationConfig from './apps.navigation.config'

const navigationConfig: NavigationTree[] = [...appsNavigationConfig]

export default navigationConfig
