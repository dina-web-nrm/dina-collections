import createLog from 'utilities/log'
import Dependor from 'utilities/Dependor'

import createSerializedModuleMap from './createSerializedModuleMap'
import unregisterModulesActionCreator from '../actionCreators/unregisterModules'
import startListeners from './startListeners'
import updateModuleState from './updateModuleState'

const log = createLog('modules:bootstrap:utilities:createUnregisterModules')

export const dep = new Dependor(
  {
    createSerializedModuleMap,
    startListeners,
    unregisterModulesActionCreator,
    updateModuleState,
  },
  'modules:bootstrap:utilities:createUnregisterModules'
)

export default function createUnregisterModules({
  availableModules,
  config,
  dynamicDispatch,
  getModuleState,
  middlewareApi,
  moduleOrder,
  setModuleState,
  store,
  updateDispatch,
}) {
  return function unregisterModules(modules) {
    log.info(
      'Unregister modules start:',
      modules.map(({ name }) => name).join(', ')
    )

    const moduleState = getModuleState()

    const newModuleState = dep.updateModuleState({
      ...moduleState,
      availableModules,
      config,
      middlewareApi,
      moduleOrder,
      removeModules: modules,
    })

    const { middlewareArray, reducer } = newModuleState

    updateDispatch(middlewareArray)
    store.replaceReducer(reducer)
    dynamicDispatch(
      dep.unregisterModulesActionCreator({
        modules: dep.createSerializedModuleMap(modules),
      })
    )

    log.info('Unregister modules done')
    setModuleState(newModuleState)
  }
}
