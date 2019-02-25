import { createSelector } from 'reselect'

import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import globalCrudSelectors from 'coreModules/crud/globalSelectors'
import getSecondArgument from 'utilities/getSecondArgument'
import { SKELETON, SKIN, OTHER_PREPARATION, WET_PREPARATION } from './constants'

const {
  preparationType: { getAll: getPreparationTypes },
  featureType: {
    getAll: getFeatureTypes,
    getItemsObject: getFeatureTypesObject,
  },
} = globalCrudSelectors

const createDropdownSelector = (categoryFilter, numberOfResults) => {
  return createSelector(
    [getPreparationTypes, getSecondArgument],
    (preparationTypes, searchQuery = '') => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase()
      const mappedPreparationTypes = preparationTypes
        .filter(({ attributes }) =>
          categoryFilter === 'all'
            ? true
            : attributes.category === categoryFilter
        )
        .map(({ id, attributes }) => {
          return {
            key: id,
            text: capitalizeFirstLetter(attributes.name.en),
            value: id,
          }
        })

      const firstLetterMatches = mappedPreparationTypes.filter(({ text }) => {
        if (!searchQuery) {
          return true
        }
        return text && text.toLowerCase().indexOf(lowerCaseSearchQuery) === 0
      })

      const otherMatches = mappedPreparationTypes.filter(({ text }) => {
        if (!searchQuery) {
          return false
        }
        return text && text.toLowerCase().indexOf(lowerCaseSearchQuery) > 0
      })

      return [...firstLetterMatches, ...otherMatches].slice(0, numberOfResults)
    }
  )
}

const getDropdownSkeletonOptions = createDropdownSelector(SKELETON)
const getDropdownSkinOptions = createDropdownSelector(SKIN)
const getDropdownWetPreparationOptions = createDropdownSelector(WET_PREPARATION)
const getDropdownOtherPreparationOptions = createDropdownSelector(
  OTHER_PREPARATION
)

const getPreparationTypeOptions = (state, category) => {
  switch (category) {
    case SKELETON: {
      return getDropdownSkeletonOptions(state)
    }
    case SKIN: {
      return getDropdownSkinOptions(state)
    }
    case WET_PREPARATION: {
      return getDropdownWetPreparationOptions(state)
    }
    case OTHER_PREPARATION: {
      return getDropdownOtherPreparationOptions(state)
    }
    default: {
      throw new Error(`unknown preparationType category: ${category}`)
    }
  }
}

const getGroupedFeatureTypeIds = createSelector(
  getFeatureTypes,
  featureTypes => {
    return featureTypes.reduce((groupToIdsMap, { id, attributes }) => {
      const { group } = attributes
      return {
        ...groupToIdsMap,
        [group]: groupToIdsMap[group] ? [...groupToIdsMap[group], id] : [id],
      }
    }, {})
  }
)

const getFeatureTypesInGroups = createSelector(
  [
    getFeatureTypesObject,
    getGroupedFeatureTypeIds,
    (_, groups) => (groups ? groups.join() : ''),
  ],
  (featureTypesObject, groupToIdsMap, groupsString) => {
    return groupsString.split(',').reduce((arr, group) => {
      const featureTypeIds = groupToIdsMap[group]

      const groupFeatureTypes =
        featureTypeIds &&
        featureTypeIds.map(id => {
          return featureTypesObject[id]
        })

      return groupFeatureTypes ? [...arr, ...groupFeatureTypes] : arr
    }, [])
  }
)

const getNumberOfFeatureTypesInGroups = createSelector(
  getFeatureTypesInGroups,
  featureTypes => {
    return featureTypes.length
  }
)

export default {
  getDropdownSkeletonOptions,
  getDropdownSkinOptions,
  getDropdownWetPreparationOptions,
  getFeatureTypesInGroups,
  getGroupedFeatureTypeIds,
  getNumberOfFeatureTypesInGroups,
  getPreparationTypeOptions,
}
