import createLog from 'utilities/log'
import createActionCreators from '../actionCreators'
import createActionHandlers from '../actionHandlers'
import createActionTypes from '../actionTypes'
import createCoreReducer from '../coreReducer'
import createGlobalSelectors from '../globalSelectors'
import createResourceReducer from '../resourceReducer'
import createSelectors from '../selectors'

const log = createLog('coreModules:crud:dux')

export default function dux(specification) {
  const selectors = {}
  const globalSelectors = {}
  const actionTypes = {}
  const actionHandlers = {}
  const actionCreators = {}
  const resourceReducers = {}
  Object.values((specification && specification.resources) || {}).forEach(
    resourceSpecification => {
      const { resource } = resourceSpecification
      log.info(`Setting up resource: ${resource}`)
      const resourceActionTypes = createActionTypes({ resourceSpecification })

      const resourceActionHandlers = createActionHandlers({
        resourceActionTypes,
        resourceSpecification,
      })

      const resourceActionCreators = createActionCreators({
        resourceActionTypes,
        resourceSpecification,
      })

      const resourceSelectors = createSelectors({
        resourceSpecification,
      })

      const resourceGlobalSelectors = createGlobalSelectors({
        resourceSelectors,
      })
      const resourceReducer = createResourceReducer({
        resourceActionHandlers,
        resourceSpecification,
      })
      actionCreators[resource] = resourceActionCreators
      actionHandlers[resource] = resourceActionHandlers
      actionTypes[resource] = resourceActionTypes
      globalSelectors[resource] = resourceGlobalSelectors
      resourceReducers[resource] = resourceReducer
      selectors[resource] = resourceSelectors
    }
  )

  const reducer = createCoreReducer({
    resourceReducers,
  })
  return {
    actionCreators,
    actionHandlers,
    actionTypes,
    globalSelectors,
    reducer,
    selectors,
  }
}
