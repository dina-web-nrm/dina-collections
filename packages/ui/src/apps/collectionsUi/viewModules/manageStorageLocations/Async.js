import { createAsyncView } from 'coreModules/bootstrap/higherOrderComponents'
import { MODULE_NAME } from './constants'

export default createAsyncView({
  modules: () => {
    return [
      import('coreModules/search'),
      import('domainModules/taxon'),
      import('domainModules/storage'),
      import('coreModules/form'),
      import('coreModules/formSupport'),
    ]
  },
  name: MODULE_NAME,
  view: () => {
    return import('./index.js')
  },
})
