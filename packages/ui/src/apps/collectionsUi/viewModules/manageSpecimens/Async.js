import { createAsyncView } from 'coreModules/bootstrap/higherOrderComponents'
import { MODULE_NAME } from './constants'

export default createAsyncView({
  modules: () => {
    return [
      import('coreModules/form'),
      import('coreModules/formSupport'),
      import('coreModules/search'),
      import('serviceModules/agent'),
      import('serviceModules/specimen'),
      import('serviceModules/locality'),
      import('serviceModules/storage'),
      import('serviceModules/taxon'),
    ]
  },
  name: MODULE_NAME,
  view: () => {
    return import('./index.js')
  },
})
