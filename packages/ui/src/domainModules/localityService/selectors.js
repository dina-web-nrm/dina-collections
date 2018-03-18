import { createSelector } from 'reselect'
import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import getSecondArgument from 'utilities/getSecondArgument'

import {
  CONTINENT,
  COUNTRY,
  DISTRICT,
  MODULE_NAME,
  PROVINCE,
} from './constants'

export const getLocalState = state => {
  return state[MODULE_NAME]
}

export const getResources = state => {
  return state.resources
}

export const getCuratedLocalities = createSelector(getResources, resources => {
  return resources.curatedLocalities
})

export const getCuratedLocality = createSelector(
  [getCuratedLocalities, getSecondArgument],
  (curatedLocalities, id) => {
    return curatedLocalities[id]
  }
)

export const getHasCuratedLocalities = createSelector(
  getCuratedLocalities,
  curatedLocalities => {
    return Object.keys(curatedLocalities).length > 0
  }
)

const createDropdownSelector = groupFilter => {
  return createSelector(
    [getCuratedLocalities, getSecondArgument],
    (curatedLocalities, searchQuery = '') => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase()
      const firstLetterMatches = Object.values(curatedLocalities)
        .filter(({ group }) => group === groupFilter)
        .map(({ id, name }) => {
          return {
            key: id,
            text: capitalizeFirstLetter(name),
            value: id,
          }
        })
        .filter(({ text }) => {
          return text.toLowerCase().indexOf(lowerCaseSearchQuery) === 0
        })

      const otherMatches = Object.values(curatedLocalities)
        .filter(({ group }) => group === groupFilter)
        .map(({ id, name }) => {
          return {
            key: id,
            text: capitalizeFirstLetter(name),
            value: id,
          }
        })
        .filter(({ text }) => {
          return text.toLowerCase().indexOf(lowerCaseSearchQuery) > 0
        })

      return [...firstLetterMatches, ...otherMatches].slice(0, 5)
    }
  )
}

export const getDropdownContinentOptions = createDropdownSelector(CONTINENT)
export const getDropdownCountryOptions = createDropdownSelector(COUNTRY)
export const getDropdownDistrictOptions = createDropdownSelector(DISTRICT)
export const getDropdownProvinceOptions = createDropdownSelector(PROVINCE)
