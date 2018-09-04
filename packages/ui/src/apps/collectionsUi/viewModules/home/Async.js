import { createAsyncView } from 'coreModules/bootstrap/higherOrderComponents'
import { MODULE_NAME } from './constants'

export default createAsyncView({
  modules: () => {
    return [
      import('coreModules/search'),
      import('domainModules/locality'),
      import('domainModules/storage'),
      import('domainModules/taxon'),
      import('domainModules/agent'),
      import('coreModules/form'),
    ]
  },
  name: MODULE_NAME,
  view: () => {
    return import('./index.js')
  },
})
