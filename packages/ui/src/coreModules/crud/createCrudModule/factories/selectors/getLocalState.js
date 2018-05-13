import { MODULE_NAME, RESOURCES_NAMESPACE } from '../../../constants'

export default function getLocalState(state) {
  return state[MODULE_NAME] && state[MODULE_NAME][RESOURCES_NAMESPACE]
}
