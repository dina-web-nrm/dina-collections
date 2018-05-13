import allCoreModules from 'coreModules/allModules'
import allDomainModules from 'domainModules/allModules'
import createStore from 'store'
import createDefaultTestConfig from './defaultTestConfig'

export default function createTestStore(
  {
    bootstrap = false,
    config = createDefaultTestConfig(),
    initialState,
    modules = [...allCoreModules, ...allDomainModules],
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
