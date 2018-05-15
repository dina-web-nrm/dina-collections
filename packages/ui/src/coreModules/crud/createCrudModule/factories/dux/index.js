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

  const getGlobalSelectors = () => {
    return globalSelectors
  }

  Object.values((specification && specification.resources) || {}).forEach(
    resourceSpecification => {
      const { resource } = resourceSpecification
      log.info(`Setting up resource: ${resource} actionTypes`)
      const resourceActionTypes = createActionTypes({ resourceSpecification })
      actionTypes[resource] = resourceActionTypes
    }
  )

  Object.values((specification && specification.resources) || {}).forEach(
    resourceSpecification => {
      const { resource } = resourceSpecification
      log.info(`Setting up resource: ${resource}`)
      const resourceActionTypes = actionTypes[resource]

      const resourceActionHandlers = createActionHandlers({
        resourceActionTypes,
        resourceSpecification,
      })

      const resourceActionCreators = createActionCreators({
        actionTypes,
        resourceActionTypes,
        resourceSpecification,
      })

      const resourceSelectors = createSelectors({
        resourceSpecification,
      })

      const resourceGlobalSelectors = createGlobalSelectors({
        getGlobalSelectors,
        resourceSelectors,
      })
      const resourceReducer = createResourceReducer({
        resourceActionHandlers,
        resourceSpecification,
      })
      actionCreators[resource] = resourceActionCreators
      actionHandlers[resource] = resourceActionHandlers
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
