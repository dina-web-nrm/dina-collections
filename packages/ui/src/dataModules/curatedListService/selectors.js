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

export const getFeatureObservationTypes = createSelector(
  getResources,
  resources => {
    return resources.featureObservationTypes
  }
)

export const getFeatureObservationType = createSelector(
  [getFeatureObservationTypes, getSecondArgument],
  (featureObservationTypes, id) => {
    return featureObservationTypes[id]
  }
)

export const getHasFeatureObservationTypes = createSelector(
  getFeatureObservationTypes,
  featureObservationTypes => {
    return Object.keys(featureObservationTypes).length > 0
  }
)
