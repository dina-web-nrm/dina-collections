import { createSelector } from 'reselect'

import curatedListServiceSelectors from 'dataModules/curatedListService/globalSelectors'
import globalSelectors from './globalSelectors'

const { getFeatureTypes } = curatedListServiceSelectors
const { getGroupedFeatureTypeIds } = globalSelectors

export const makeGetFeatureTypesInGroups = () => {
  return createSelector(
    [
      getFeatureTypes,
      getGroupedFeatureTypeIds,
      (_, groups) => (groups ? groups.join() : ''),
    ],
    (featureTypes, groupToIdsMap, groupsString) => {
      return groupsString.split(',').reduce((arr, group) => {
        const featureTypeIds = groupToIdsMap[group]

        const groupFeatureTypes =
          featureTypeIds &&
          featureTypeIds.map(id => {
            return featureTypes[id]
          })

        return groupFeatureTypes ? [...arr, ...groupFeatureTypes] : arr
      }, [])
    }
  )
}
