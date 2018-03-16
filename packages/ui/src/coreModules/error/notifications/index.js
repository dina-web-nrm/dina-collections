import { Flash } from 'coreModules/notifications/components'
import { COLLISION_REPLACE, FIXED } from 'coreModules/notifications/constants'

const ERROR = {
  collision: COLLISION_REPLACE,
  component: Flash,
  displayType: FIXED,
  level: 'error',
  priority: 20,
  ttl: 8000,
  type: 'ERROR',
}

export { ERROR }
