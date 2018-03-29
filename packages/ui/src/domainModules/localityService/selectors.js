import { createSelector } from 'reselect'
import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import getSecondArgument from 'utilities/getSecondArgument'

import {
  ALL,
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

export const getCuratedLocalitiesArray = createSelector(
  getCuratedLocalities,
  curatedLocalitiesObject => {
    return Object.keys(curatedLocalitiesObject).map(key => {
      return curatedLocalitiesObject[key]
    })
  }
)

export const getCuratedLocalitiesSortedArray = createSelector(
  getCuratedLocalitiesArray,
  curatedLocalitiesArray => {
    return curatedLocalitiesArray.sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
  }
)

export const getCuratedLocalitiesArrayByFilter = createSelector(
  getCuratedLocalitiesSortedArray,
  getSecondArgument,
  (curatedLocalitiesArray, filter = {}) => {
    const {
      group: groupFilter,
      limit: limitFilter,
      offset = 0,
      parentId: parentIdFilter,
      searchQuery: searchQueryFilter,
    } = filter
    let filteredCuratedLocalities = curatedLocalitiesArray

    if (parentIdFilter) {
      filteredCuratedLocalities = filteredCuratedLocalities.filter(locality => {
        return (locality.parent && locality.parent.id) === parentIdFilter
      })
    }
    if (searchQueryFilter) {
      const lowerCaseSearchQuery = searchQueryFilter.toLowerCase()
      const firstLetterMatches = filteredCuratedLocalities.filter(
        ({ name }) => {
          return name && name.toLowerCase().indexOf(lowerCaseSearchQuery) === 0
        }
      )

      const otherMatches = filteredCuratedLocalities.filter(({ name }) => {
        return name && name.toLowerCase().indexOf(lowerCaseSearchQuery) > 0
      })

      filteredCuratedLocalities = [...firstLetterMatches, ...otherMatches]
    }

    if (groupFilter) {
      filteredCuratedLocalities = filteredCuratedLocalities.filter(
        ({ group }) => group === groupFilter
      )
    }

    if (limitFilter) {
      return filteredCuratedLocalities.splice(offset, limitFilter)
    }
    return filteredCuratedLocalities
  }
)

export const getCuratedLocalityAncestorsById = createSelector(
  getCuratedLocalities,
  getSecondArgument,
  (curatedLocalities, currentId) => {
    const ancestors = []
    const walkUp = item => {
      ancestors.push(item)
      const parentId = item.parent && item.parent.id
      if (parentId) {
        const next = curatedLocalities[parentId]
        if (next) {
          walkUp(next)
        }
      }
    }

    const current = curatedLocalities[currentId]
    if (!current) {
      return ancestors
    }

    walkUp(current)

    return ancestors.reverse()
  }
)

export const getNextCuratedLocalityIdFromFilter = createSelector(
  getCuratedLocalitiesArrayByFilter,
  getSecondArgument,
  (curatedLocalitiesArray, currentId) => {
    const currentIndex = curatedLocalitiesArray.findIndex(element => {
      return element.id === currentId
    })
    const nextIndex = Number(currentIndex) + 1
    const element = curatedLocalitiesArray[nextIndex]
    return element.id
  }
)

export const getPrevCuratedLocalityIdFromFilter = createSelector(
  getCuratedLocalitiesArrayByFilter,
  getSecondArgument,
  (curatedLocalitiesArray, currentId) => {
    const currentIdex = curatedLocalitiesArray.findIndex(element => {
      return element.id === currentId
    })

    return curatedLocalitiesArray[Number(currentIdex) - 1].id
  }
)

export const getCuratedLocality = createSelector(
  [getCuratedLocalities, getSecondArgument],
  (curatedLocalities, id) => {
    return curatedLocalities[id]
  }
)

export const getCuratedLocalityOption = createSelector(
  [getCuratedLocalities, getSecondArgument],
  (curatedLocalities, id) => {
    const curatedLocality = curatedLocalities[id]
    if (!curatedLocality) {
      return null
    }
    return {
      key: curatedLocality.id,
      text: capitalizeFirstLetter(curatedLocality.name),
      value: curatedLocality.id,
    }
  }
)

export const getHasCuratedLocalities = createSelector(
  getCuratedLocalities,
  curatedLocalities => {
    return Object.keys(curatedLocalities).length > 0
  }
)

const createDropdownSelector = (groupFilter, numberOfResults = 6) => {
  return createSelector(
    [getCuratedLocalities, getSecondArgument],
    (curatedLocalities, searchQuery = '') => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase()
      const mappedGroupLocalities = Object.values(curatedLocalities)
        .filter(
          ({ group }) => (groupFilter === 'all' ? true : group === groupFilter)
        )
        .map(({ id, name }) => {
          return {
            key: id,
            text: capitalizeFirstLetter(name),
            value: id,
          }
        })

      const firstLetterMatches = mappedGroupLocalities.filter(({ text }) => {
        if (!searchQuery) {
          return true
        }
        return text && text.toLowerCase().indexOf(lowerCaseSearchQuery) === 0
      })

      const otherMatches = mappedGroupLocalities.filter(({ text }) => {
        if (!searchQuery) {
          return false
        }
        return text && text.toLowerCase().indexOf(lowerCaseSearchQuery) > 0
      })

      return [...firstLetterMatches, ...otherMatches].slice(0, numberOfResults)
    }
  )
}

// setting 15 so all continents are shown in initial options list
export const getDropdownContinentOptions = createDropdownSelector(CONTINENT, 15)
export const getDropdownCountryOptions = createDropdownSelector(COUNTRY)
export const getDropdownDistrictOptions = createDropdownSelector(DISTRICT)
export const getDropdownProvinceOptions = createDropdownSelector(PROVINCE)
export const getDropdownAllOptions = createDropdownSelector(ALL)
