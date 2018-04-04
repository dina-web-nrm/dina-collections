import { createSelector } from 'reselect'

import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import curatedListServiceSelectors from 'dataModules/curatedListService/globalSelectors'
import getSecondArgument from 'utilities/getSecondArgument'
import { SKELETON, SKIN, WET_PREPARATION } from './constants'

const {
  getDistinguishedUnitTypes,
  getFeatureObservationTypes,
} = curatedListServiceSelectors

const createDropdownSelector = (categoryFilter, numberOfResults) => {
  return createSelector(
    [getDistinguishedUnitTypes, getSecondArgument],
    (distinguishedUnitTypes, searchQuery = '') => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase()
      const mappedDistinguishedUnitTypes = Object.values(distinguishedUnitTypes)
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

      const firstLetterMatches = mappedDistinguishedUnitTypes.filter(
        ({ text }) => {
          if (!searchQuery) {
            return true
          }
          return text && text.toLowerCase().indexOf(lowerCaseSearchQuery) === 0
        }
      )

      const otherMatches = mappedDistinguishedUnitTypes.filter(({ text }) => {
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

const getDistinguishedUnitTypeOptions = (state, category) => {
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
      throw new Error(`unknown distinguishedUnitType category: ${category}`)
    }
  }
}

const getGroupedFeatureObservationTypeIds = createSelector(
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

const getFeatureObservationTypesInGroups = createSelector(
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

const getNumberOfFeatureObservationTypesInGroups = createSelector(
  getFeatureObservationTypesInGroups,
  featureObservationTypes => {
    return featureObservationTypes.length
  }
)

export default {
  getDistinguishedUnitTypeOptions,
  getDropdownSkeletonOptions,
  getDropdownSkinOptions,
  getDropdownWetPreparationOptions,
  getFeatureObservationTypesInGroups,
  getGroupedFeatureObservationTypeIds,
  getNumberOfFeatureObservationTypesInGroups,
}
