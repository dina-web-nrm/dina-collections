import createLog from 'utilities/log'
import immutable from 'object-path-immutable'
import Dependor from 'utilities/Dependor'
import createItemUpdatePath from './createItemUpdatePath'

export const dep = new Dependor({
  assign: immutable.assign,
  createItemUpdatePath,
})

const log = createLog(
  'coreModules:crud:actionHandlers:updateStateWithOneFactory'
)

export default function updateStateWithOneFactory({
  operationType,
  resource,
} = {}) {
  return function handleOne(state, action) {
    if (!(action && action.payload && action.payload.id)) {
      log.debug(
        `Received action ${action &&
          action.type} for ${resource}.${operationType}. Aborting`
      )

      return state
    }

    log.debug(
      `Received action ${
        action.type
      } for ${resource}.${operationType}. Updating state from action: `,
      action
    )

    const { id } = action.payload

    const { removeFromState, storeInState } = action.meta || {}

    if (removeFromState) {
      const updatedItems = {
        ...state.items,
      }

      delete updatedItems[id]
      return {
        ...state,
        items: updatedItems,
      }
    }

    if (storeInState === false) {
      return state
    }

    const updatePath = dep.createItemUpdatePath({
      id,
    })

    const currentItem = state.items && state.items[id]

    if (currentItem && currentItem.relationships) {
      return dep.assign(state, updatePath, {
        ...action.payload,
        relationships: {
          ...currentItem.relationships,
          ...(action.payload.relationships || {}),
        },
      })
    }

    return dep.assign(state, updatePath, action.payload)
  }
}
