import { compose } from 'redux'
import createLog from 'utilities/log'
import Dependor from 'utilities/Dependor'

import createRegisterModules from './utilities/createRegisterModules'
import createUnregisterModules from './utilities/createUnregisterModules'
import createEnhancerStateManager from './utilities/createEnhancerStateManager'
import createAsyncRegisterModules from './utilities/createAsyncRegisterModules'
import createAsyncUnregisterModules from './utilities/createAsyncUnregisterModules'

const log = createLog('modules:bootstrap:enhancer')

export const dep = new Dependor(
  {
    createAsyncRegisterModules,
    createAsyncUnregisterModules,
    createRegisterModules,
    createUnregisterModules,
  },
  'modules:bootstrap:enhancer'
)

export default function updateStoreEnhancer({ config, moduleOrder = [] }) {
  const availableModules = moduleOrder.reduce((obj, moduleName) => {
    return {
      ...obj,
      [moduleName]: true,
    }
  }, {})

  return createStore => (...params) => {
    log.info('Create store')
    const store = createStore(...params)
    const { dispatch } = store

    const {
      getDispatch,
      getModuleState,
      setDispatch,
      setModuleState,
    } = createEnhancerStateManager({
      dispatch,
    })

    const middlewareApi = {
      dispatch: (...args) => getDispatch()(...args),
      getState: store.getState,
    }

    const updateDispatch = middlewares => {
      const chain = middlewares.map(middleware => middleware(middlewareApi))
      setDispatch(compose(...chain)(store.dispatch))
    }

    const dynamicDispatch = (...args) => {
      return getDispatch()(...args)
    }

    const registerModules = dep.createRegisterModules({
      availableModules,
      config,
      dynamicDispatch,
      getModuleState,
      middlewareApi,
      moduleOrder,
      setModuleState,
      store,
      updateDispatch,
    })

    const unregisterModules = dep.createUnregisterModules({
      availableModules,
      config,
      dynamicDispatch,
      getModuleState,
      middlewareApi,
      moduleOrder,
      setModuleState,
      store,
      updateDispatch,
    })

    updateDispatch([])

    return {
      ...store,
      dispatch: dynamicDispatch,
      registerModules,
      unregisterModules,
    }
  }
}
