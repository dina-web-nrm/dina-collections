import { createSelector } from 'reselect'

import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import listSelectors from 'domainModules/curatedListService/globalSelectors'
import getSecondArgument from 'utilities/getSecondArgument'
import { SKELETON, SKIN, WET_PREPARATION } from './constants'

const createDropdownSelector = (categoryFilter, numberOfResults) => {
  return createSelector(
    [listSelectors.getDistinguishedUnitTypes, getSecondArgument],
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

export default {
  getDistinguishedUnitTypeOptions,
  getDropdownSkeletonOptions,
  getDropdownSkinOptions,
  getDropdownWetPreparationOptions,
}
