import allCoreModules from 'coreModules/allModules'
import allDataModules from 'dataModules/allModules'
import allDomainModules from 'domainModules/allModules'
import createStore from 'store'
import createDefaultTestConfig from './defaultTestConfig'

export default function createTestStore(
  {
    bootstrap = false,
    config = createDefaultTestConfig(),
    initialState,
    modules = [...allCoreModules, ...allDataModules, ...allDomainModules],
    viewOrder = [],
  } = {}
) {
  return createStore({
    bootstrap,
    config,
    initialState,
    modules,
    viewOrder,
  })
}
