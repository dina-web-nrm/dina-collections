import { createSelector } from 'reselect'
import getSecondArgument from 'utilities/getSecondArgument'

import { MODULE_NAME } from './constants'

export const getLocalState = state => {
  return state[MODULE_NAME]
}

export const getResources = state => {
  return state.resources
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

export const getGroupedFeatureObservationTypeIds = createSelector(
  getFeatureObservationTypes,
  featureObservationTypes => {
    return Object.values(featureObservationTypes).reduce(
      (groupToIdsMap, { id, group }) => {
        return {
          ...groupToIdsMap,
          [group]: groupToIdsMap[group] ? [...groupToIdsMap[group], id] : [id],
        }
      },
      {}
    )
  }
)

export const getFeatureObservationTypesInGroups = createSelector(
  [
    getFeatureObservationTypes,
    getGroupedFeatureObservationTypeIds,
    getSecondArgument,
  ],
  (featureObservationTypes, groupToIdsMap, groups) => {
    return groups.reduce((arr, group) => {
      const featureObservationTypeIds = groupToIdsMap[group]

      const groupFeatureObservationTypes =
        featureObservationTypeIds &&
        featureObservationTypeIds.map(id => {
          return featureObservationTypes[id]
        })

      return groupFeatureObservationTypes
        ? [...arr, ...groupFeatureObservationTypes]
        : arr
    }, [])
  }
)

export const getNumberOfFeatureObservationTypesInGroups = createSelector(
  getFeatureObservationTypesInGroups,
  featureObservationTypes => {
    return featureObservationTypes.length
  }
)
