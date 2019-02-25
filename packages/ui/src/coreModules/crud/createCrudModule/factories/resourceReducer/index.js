import createLog from 'utilities/log'

const log = createLog('coreModules:crud:resourceReducer')
export default function createResourceReducer({
  resourceActionHandlers = {},
  resourceSpecification = {},
} = {}) {
  const { resource } = resourceSpecification
  const initialState = { items: {} }
  log.info(
    `Creating reducer for resource: ${resource} with initialState:`,
    initialState
  )

  return function reducer(state = initialState, action = {}) {
    const actionHandler = resourceActionHandlers[action.type]
    if (actionHandler) {
      return actionHandler(state, action)
    }
    return state
  }
}
