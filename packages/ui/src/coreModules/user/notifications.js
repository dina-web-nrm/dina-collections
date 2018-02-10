import { Flash } from 'coreModules/notifications/components'
import { FIXED } from 'coreModules/notifications/constants'
import { USER_LOG_IN_SUCCESS } from 'coreModules/user/actionTypes'

const LOG_IN_SUCCESS = {
  component: Flash,
  componentProps: {
    headerKey: 'modules.user.welcomeBack',
  },
  displayType: FIXED,
  priority: 10,
  triggerActions: [USER_LOG_IN_SUCCESS],
  ttl: 3000,
  type: 'LOG_IN_SUCCESS',
}

export { LOG_IN_SUCCESS }
