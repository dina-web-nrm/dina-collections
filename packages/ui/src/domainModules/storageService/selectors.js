import { createSelector } from 'reselect'
import getSecondArgument from 'utilities/getSecondArgument'

import { MODULE_NAME } from './constants'

export const getLocalState = state => {
  return state[MODULE_NAME]
}

export const getResources = state => {
  return state.resources
}

export const getPhysicalUnits = createSelector(getResources, resources => {
  return resources.physicalUnits
})

export const getPhysicalUnit = createSelector(
  [getPhysicalUnits, getSecondArgument],
  (physicalUnits, id) => {
    return physicalUnits[id]
  }
)

export const getStorageLocations = createSelector(getResources, resources => {
  return resources.storageLocations
})

export const getStorageLocation = createSelector(
  [getStorageLocations, getSecondArgument],
  (storageLocations, id) => {
    return storageLocations[id]
  }
)
