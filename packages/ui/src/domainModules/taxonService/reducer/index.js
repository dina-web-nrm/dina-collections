import { combineReducers } from 'redux'

import lookup from './lookup'
import resources from './resources'

export default combineReducers({
  lookup,
  resources,
})
