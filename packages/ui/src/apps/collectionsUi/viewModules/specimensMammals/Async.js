import { createAsyncView } from 'coreModules/bootstrap/higherOrderComponents'
import { MODULE_NAME } from './constants'

export default createAsyncView({
  modules: () => {
    return [
      import('coreModules/form'),
      import('coreModules/formSupport'),
      import('coreModules/search'),
      import('domainModules/agent'),
      import('domainModules/collectionMammals'),
      import('domainModules/locality'),
      import('domainModules/storage'),
      import('domainModules/taxon'),
    ]
  },
  name: MODULE_NAME,
  view: () => {
    return import('./index.js')
  },
})
