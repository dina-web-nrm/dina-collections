import { combineReducers } from 'redux'

import physicalUnits from './physicalUnits'
import storageLocations from './storageLocations'

export default combineReducers({ physicalUnits, storageLocations })
