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
    ':resource.allItems.fetched',
    ':resource.allItems.fetching',
    ':resource.count.value',
    ':resource.count.fetched',
    ':resource.count.fetching',
    'nestedCache',
    'nestedCache.:namespace.items',
    'nestedCache.:namespace.items.:id',
  ],
  name: MODULE_NAME,
  reducerKey: KEY_OBJECT_NAMSPACE,
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }
