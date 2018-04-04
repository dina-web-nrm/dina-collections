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

export const getCuratedLocalitiesArray = createSelector(
  getCuratedLocalities,
  curatedLocalitiesObject => {
    return Object.keys(curatedLocalitiesObject).map(key => {
      return curatedLocalitiesObject[key]
    })
  }
)

export const getCuratedLocality = createSelector(
  [getCuratedLocalities, getSecondArgument],
  (curatedLocalities, id) => {
    return curatedLocalities[id]
  }
)

export const getHasCuratedLocalities = createSelector(
  getCuratedLocalities,
  curatedLocalities => {
    return Object.keys(curatedLocalities).length > 0
  }
)
