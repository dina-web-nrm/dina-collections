import { createSelector } from 'reselect'

import globalCrudSelectors from 'coreModules/crud/globalSelectors'
import globalSelectors from './globalSelectors'

const {
  featureType: { getItemsObject: getFeatureTypesObject },
} = globalCrudSelectors
const { getGroupedFeatureTypeIds } = globalSelectors

export const makeGetFeatureTypesInGroups = () => {
  return createSelector(
    [
      getFeatureTypesObject,
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
