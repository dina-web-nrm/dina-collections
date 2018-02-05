import { LOCATION_CHANGE } from 'react-router-redux'
import { SIZE_SET_BREAKPOINT } from 'coreModules/size/actionTypes'
import { Flash } from 'coreModules/notifications/components'
import {
  COLLISION_REPLACE,
  FIXED,
  INLINE,
} from 'coreModules/notifications/constants'
import HelpTextNotification from '../components/HelpTextNotification'

const fieldHelpTextDefaults = {
  collision: COLLISION_REPLACE,
  component: HelpTextNotification,
  displayType: INLINE,
  priority: 10,
  terminateActions: [LOCATION_CHANGE, SIZE_SET_BREAKPOINT],
  type: 'HELP_TEXT',
}

const HELP_TEXT = {
  ...fieldHelpTextDefaults,
}

const FIELD_CHANGE_WARNING = {
  collision: COLLISION_REPLACE,
  component: Flash,
  displayType: FIXED,
  level: 'warning',
  priority: 10,
  terminateActions: [LOCATION_CHANGE],
  ttl: 8000,
  type: 'FIELD_CHANGE_WARNING',
}

export { FIELD_CHANGE_WARNING, HELP_TEXT }
