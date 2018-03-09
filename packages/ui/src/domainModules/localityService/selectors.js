import { createSelector } from 'reselect'
import getSecondArgument from 'utilities/getSecondArgument'

import { MODULE_NAME } from './constants'

export const getLocalState = state => {
  return state[MODULE_NAME]
}

export const getResources = state => {
  return state.resources
}

export const getCuratedLocalities = createSelector(getResources, resources => {
  return resources.curatedLocalities
})

export const getCuratedLocality = createSelector(
  [getCuratedLocalities, getSecondArgument],
  (curatedLocalities, id) => {
    return curatedLocalities[id]
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
