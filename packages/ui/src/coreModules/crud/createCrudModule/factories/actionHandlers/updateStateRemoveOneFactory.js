import createLog from 'utilities/log'

const log = createLog(
  'coreModules:crud:actionHandlers:updateStateRemoveOneFactory'
)

export default function updateStateRemoveOneFactory(
  { operationType, resource } = {}
) {
  return function handleRemoveOn(state, action) {
    if (!(action && action.payload && action.payload.id)) {
      log.debug(
        `Received action ${action && action.type} for ${resource}.${
          operationType
        }. Aborting`
      )

      return state
    }

    log.debug(
      `Received action ${action.type} for ${resource}.${
        operationType
      }. Updating state from action: `,
      action
    )

    const updatedItems = {
      ...state.items,
    }

    delete updatedItems[action.payload.id]
    return {
      ...state,
      items: updatedItems,
    }
  }
}
