import { createSelector } from 'reselect'

import curatedListServiceSelectors from 'dataModules/curatedListService/globalSelectors'
import globalSelectors from './globalSelectors'

const { getFeatureObservationTypes } = curatedListServiceSelectors
const { getGroupedFeatureObservationTypeIds } = globalSelectors

export const makeGetFeatureObservationTypesInGroups = () => {
  return createSelector(
    [
      getFeatureObservationTypes,
      getGroupedFeatureObservationTypeIds,
      (_, groups) => (groups ? groups.join() : ''),
    ],
    (featureObservationTypes, groupToIdsMap, groupsString) => {
      return groupsString.split(',').reduce((arr, group) => {
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
}
