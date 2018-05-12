import { createStore as reduxCreateStore, compose } from 'redux'
import hotswapStoreEnhancer from 'coreModules/bootstrap/enhancer'
import createLog from 'utilities/log'
import { enhancer as devToolsExtensionEnhancer } from 'coreModules/devToolsExtension'
import { moduleOrder as coreModuleOrder } from 'coreModules'
import { moduleOrder as domainModuleOrder } from 'domainModules'

const log = createLog('store')

export default function createStoreMain({
  config,
  initialState = {},
  modules,
  viewOrder,
}) {
  log.info('Start createStoreMain')
  log.info('Creating enhancers')
  const enhancers = [
    hotswapStoreEnhancer({
      config,
      moduleOrder: [...coreModuleOrder, ...domainModuleOrder, ...viewOrder],
    }),
    devToolsExtensionEnhancer && devToolsExtensionEnhancer(), // dont do this in production
  ].filter(enhancer => !!enhancer)
  const composedEnhancers = compose(...enhancers)
  const emptyReducer = state => state

  log.info('Creating store')
  const store = reduxCreateStore(emptyReducer, initialState, composedEnhancers)

  log.info('Register modules start')
  store.registerModules(modules)
  log.info('Register modules done')

  return store
}
