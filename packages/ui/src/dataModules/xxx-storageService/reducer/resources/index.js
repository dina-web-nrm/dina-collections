import { combineReducers } from 'redux'

import physicalObjects from './physicalObjects'
import storageLocations from './storageLocations'

export default combineReducers({ physicalObjects, storageLocations })
