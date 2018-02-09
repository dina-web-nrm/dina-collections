import { createAsyncView } from 'coreModules/bootstrap/higherOrderComponents'
import { MODULE_NAME } from './constants'

export default createAsyncView({
  modules: () => {
    return [import('coreModules/form')]
  },
  name: MODULE_NAME,
  view: () => {
    return import('./index.js')
  },
})
