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

export default function updateStateWithOneFactory(
  { operationType, resource } = {}
) {
  return function handleOne(state, action) {
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

    const { id } = action.payload
    const updatePath = dep.createItemUpdatePath({
      id,
    })

    return dep.assign(state, updatePath, action.payload)
  }
}
