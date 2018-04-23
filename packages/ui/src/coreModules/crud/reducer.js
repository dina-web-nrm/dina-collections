import { combineReducers } from 'redux'
import crudModule from './crudModule'
import { reducer as keyObjectModuleReducer } from './keyObjectModule'
import { RESOURCES_NAMESPACE, KEY_OBJECT_NAMSPACE } from './constants'

export default combineReducers({
  [KEY_OBJECT_NAMSPACE]: keyObjectModuleReducer,
  [RESOURCES_NAMESPACE]: crudModule.reducer,
})
