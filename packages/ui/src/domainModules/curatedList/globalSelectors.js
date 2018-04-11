import { createSelector } from 'reselect'

import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import curatedListServiceSelectors from 'dataModules/curatedListService/globalSelectors'
import getSecondArgument from 'utilities/getSecondArgument'
import { SKELETON, SKIN, WET_PREPARATION } from './constants'

const { getPreparationTypes, getFeatureTypes } = curatedListServiceSelectors

const createDropdownSelector = (categoryFilter, numberOfResults) => {
  return createSelector(
    [getPreparationTypes, getSecondArgument],
    (preparationTypes, searchQuery = '') => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase()
      const mappedPreparationTypes = Object.values(preparationTypes)
        .filter(
          ({ category }) =>
            categoryFilter === 'all' ? true : category === categoryFilter
        )
        .map(({ id, name }) => {
          return {
            key: id,
            text: capitalizeFirstLetter(name),
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
    case 'undefined': {
      // fallback in edge case to show all options
      return [
        ...getDropdownSkeletonOptions(state).map(option => ({
          ...option,
          text: `${SKELETON}—${option.text}`,
        })),
        ...getDropdownSkinOptions(state).map(option => ({
          ...option,
          text: `${SKIN}—${option.text}`,
        })),
        ...getDropdownWetPreparationOptions(state).map(option => ({
          ...option,
          text: `${WET_PREPARATION}—${option.text}`,
        })),
      ]
    }
    default: {
      throw new Error(`unknown preparationType category: ${category}`)
    }
  }
}

const getGroupedFeatureTypeIds = createSelector(
  getFeatureTypes,
  featureTypes => {
    return Object.values(featureTypes).reduce(
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

const getFeatureTypesInGroups = createSelector(
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
