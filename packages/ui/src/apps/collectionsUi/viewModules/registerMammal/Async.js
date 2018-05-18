import { createAsyncView } from 'coreModules/bootstrap/higherOrderComponents'
import { MODULE_NAME } from './constants'

export default createAsyncView({
  modules: () => {
    return [
      import('coreModules/crudBlocks'),
      import('coreModules/form'),
      import('domainModules/agent'),
      import('domainModules/locality'),
      import('domainModules/storage'),
      import('domainModules/taxon'),
      import('domainModules/collectionMammals'),
    ]
  },
  name: MODULE_NAME,
  view: () => {
    return import('./index.js')
  },
})
