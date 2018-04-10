import { createSelector } from 'reselect'

import getSecondArgument from 'utilities/getSecondArgument'

import { MODULE_NAME } from './constants'

export const getLocalState = state => {
  return state[MODULE_NAME]
}

export const getResources = state => {
  return state.resources
}

export const getDistinguishedUnitTypes = createSelector(
  getResources,
  resources => {
    return resources.distinguishedUnitTypes
  }
)

export const getDistinguishedUnitType = (state, id) => {
  const distinguishedUnitTypes = getDistinguishedUnitTypes(state)
  return distinguishedUnitTypes[id]
}

export const getFeatureTypes = createSelector(getResources, resources => {
  return resources.featureTypes
})

export const getFeatureType = createSelector(
  [getFeatureTypes, getSecondArgument],
  (featureTypes, id) => {
    return featureTypes[id]
  }
)

export const getHasFeatureTypes = createSelector(
  getFeatureTypes,
  featureTypes => {
    return Object.keys(featureTypes).length > 0
  }
)
