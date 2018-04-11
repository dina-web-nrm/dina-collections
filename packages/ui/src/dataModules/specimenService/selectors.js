import { createSelector } from 'reselect'

import getSecondArgument from 'utilities/getSecondArgument'

import { MODULE_NAME } from './constants'

export const getLocalState = state => {
  return state[MODULE_NAME]
}

export const getResources = state => {
  return state.resources
}

export const getSpecimens = createSelector(getResources, resources => {
  return resources.specimens
})

export const getSpecimen = createSelector(
  [getSpecimens, getSecondArgument],
  (specimens, id) => {
    return specimens[id]
  }
)

export const getHasSpecimens = createSelector(getSpecimens, specimens => {
  return Object.keys(specimens).length > 0
})

export const getSpecimenIndividual = createSelector(
  getSpecimen,
  specimen => specimen && specimen.individual
)

export const getSpecimenFeatureObservations = createSelector(
  getSpecimenIndividual,
  individual => individual && individual.featureObservations
)

export const getSpecimenReadOnly = createSelector(
  getSpecimen,
  specimen => specimen && specimen.readOnly
)
