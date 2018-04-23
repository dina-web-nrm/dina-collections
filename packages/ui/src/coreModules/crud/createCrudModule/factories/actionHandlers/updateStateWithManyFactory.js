import createLog from 'utilities/log'

import immutable from 'object-path-immutable'
import Dependor from 'utilities/Dependor'
import createItemUpdatePath from './createItemUpdatePath'

export const dep = new Dependor({
  assign: immutable.assign,
  createItemUpdatePath,
})

const log = createLog(
  'coreModules:crud:actionHandlers:updateStateWithManyFactory'
)

export default function updateStateWithManyFactory(
  { operationType, resource } = {}
) {
  return function handleMany(state, action) {
    if (!(action && action.payload && Array.isArray(action.payload))) {
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

    return action.payload.reduce((newState, item) => {
      const { id } = item
      const updatePath = dep.createItemUpdatePath({
        id,
      })

      if (!updatePath) {
        return newState
      }

      return dep.assign(newState, updatePath, item)
    }, state)
  }
}
