import keyObjectModuleFactory from 'utilities/keyObjectModuleFactory'
import { MODULE_NAME, KEY_OBJECT_NAMSPACE } from './constants'

const {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  reducer,
} = keyObjectModuleFactory({
  actionPrefix: 'CRUD',
  keys: [
    ':resource.allItemsFetched',
    ':resource.fetchingAllItems',
    'nestedCache',
    'nestedCache.:nameSpace.items',
    'nestedCache.:nameSpace.items.:id',
  ],
  name: MODULE_NAME,
  reducerKey: KEY_OBJECT_NAMSPACE,
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
