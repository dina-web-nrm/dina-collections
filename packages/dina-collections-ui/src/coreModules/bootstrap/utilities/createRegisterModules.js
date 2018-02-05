import createLog from 'utilities/log'
import Dependor from 'utilities/Dependor'

import createSerializedModuleMap from './createSerializedModuleMap'
import registerModulesActionCreator from '../actionCreators/registerModules'
import startListeners from './startListeners'
import updateModuleState from './updateModuleState'

const log = createLog('modules:bootstrap:utilities:createRegisterModules')

export const dep = new Dependor(
  {
    createSerializedModuleMap,
    registerModulesActionCreator,
    startListeners,
    updateModuleState,
  },
  'modules:bootstrap:utilities:createRegisterModules'
)

export default function createRegisterModules({
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
  return function registerModules(modules) {
    log.info(
      'Register modules start:',
      modules.map(({ name }) => name).join(', ')
    )
    const moduleState = getModuleState()

    const newModuleState = dep.updateModuleState({
      ...moduleState,
      availableModules,
      config,
      middlewareApi,
      moduleOrder,
      newModules: modules,
    })
    log.debug('Module state updated')
    const { middlewareArray, reducer } = newModuleState

    updateDispatch(middlewareArray)
    log.debug('Dispatch updated')
    store.replaceReducer(reducer)
    log.debug('Reducer replaced')
    // leave this to translation module instead?
    // might make sense to put in middleware
    // add pre and post / success
    dynamicDispatch(
      dep.registerModulesActionCreator({
        config,
        modules: dep.createSerializedModuleMap(modules),
      })
    )
    dep.startListeners({
      listenerMap: newModuleState.listenerMap,
      middlewareApi,
    })
    log.debug('Listeners started')
    log.info('Register modules done')
    setModuleState(newModuleState)
  }
}
