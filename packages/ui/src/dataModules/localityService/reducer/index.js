import { combineReducers } from 'redux'

import resources from './resources'

import { reducer as keyObject } from '../keyObjectModule'

export default combineReducers({
  keyObject,
  resources,
})
