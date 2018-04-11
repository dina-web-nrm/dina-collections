import { createSelector } from 'reselect'
import getSecondArgument from 'utilities/getSecondArgument'

import { MODULE_NAME } from './constants'

export const getLocalState = state => {
  return state[MODULE_NAME]
}

export const getResources = state => {
  return state.resources
}

export const getPhysicalObjects = createSelector(getResources, resources => {
  return resources.physicalObjects
})

export const getPhysicalObject = createSelector(
  [getPhysicalObjects, getSecondArgument],
  (physicalObjects, id) => {
    return physicalObjects[id]
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
