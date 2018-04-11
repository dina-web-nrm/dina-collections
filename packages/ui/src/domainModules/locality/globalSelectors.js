import { createSelector } from 'reselect'

import placeServiceSelectors from 'dataModules/placeService/globalSelectors'
import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import getSecondArgument from 'utilities/getSecondArgument'

import { ALL, CONTINENT, COUNTRY, DISTRICT, PROVINCE } from './constants'

const { getPlaces, getPlacesArray } = placeServiceSelectors

const getPlacesSortedArray = createSelector(getPlacesArray, placesArray => {
  return placesArray.sort((a, b) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })
})

const getPlacesArrayByFilter = createSelector(
  getPlacesSortedArray,
  getSecondArgument,
  (placesArray, filter = {}) => {
    const {
      group: groupFilter,
      limit: limitFilter,
      offset = 0,
      parentId: parentIdFilter,
      searchQuery: searchQueryFilter,
    } = filter
    let filteredPlaces = placesArray

    if (parentIdFilter) {
      filteredPlaces = filteredPlaces.filter(locality => {
        return (locality.parent && locality.parent.id) === parentIdFilter
      })
    }

    if (searchQueryFilter) {
      const lowerCaseSearchQuery = searchQueryFilter.toLowerCase()
      const firstLetterMatches = filteredPlaces.filter(({ name }) => {
        return name && name.toLowerCase().indexOf(lowerCaseSearchQuery) === 0
      })

      const otherMatches = filteredPlaces.filter(({ name }) => {
        return name && name.toLowerCase().indexOf(lowerCaseSearchQuery) > 0
      })

      filteredPlaces = [...firstLetterMatches, ...otherMatches]
    }

    if (groupFilter) {
      filteredPlaces = filteredPlaces.filter(
        ({ group }) => group === groupFilter
      )
    }

    if (limitFilter) {
      // avoid mutating filteredPlaces, as the mutation carried over
      // to future calls of this selector
      const localitiesToShow = [...filteredPlaces].splice(offset, limitFilter)
      return localitiesToShow
    }
    return filteredPlaces
  }
)

const getPlaceAncestorsById = createSelector(
  getPlaces,
  getSecondArgument,
  (places, currentId) => {
    const ancestors = []
    const walkUp = item => {
      ancestors.push(item)
      const parentId = item.parent && item.parent.id
      if (parentId) {
        const next = places[parentId]
        if (next) {
          walkUp(next)
        }
      }
    }

    const current = places[currentId]
    if (!current) {
      return ancestors
    }

    walkUp(current)

    return ancestors.reverse()
  }
)

const getNextPlaceIdFromFilter = createSelector(
  getPlacesArrayByFilter,
  getSecondArgument,
  (placesArray, currentId) => {
    const currentIndex = placesArray.findIndex(element => {
      return element.id === currentId
    })
    const nextIndex = Number(currentIndex) + 1
    const element = placesArray[nextIndex]
    return element.id
  }
)

const getPrevPlaceIdFromFilter = createSelector(
  getPlacesArrayByFilter,
  getSecondArgument,
  (placesArray, currentId) => {
    const currentIdex = placesArray.findIndex(element => {
      return element.id === currentId
    })

    return placesArray[Number(currentIdex) - 1].id
  }
)

const getPlaceOption = createSelector(
  [getPlaces, getSecondArgument],
  (places, id) => {
    const place = places[id]
    if (!place) {
      return null
    }
    return {
      key: place.id,
      text: capitalizeFirstLetter(place.name),
      value: place.id,
    }
  }
)

const createDropdownSelector = (groupFilter, numberOfResults = 6) => {
  return createSelector(
    [getPlaces, getSecondArgument],
    (places, searchQuery = '') => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase()
      const mappedGroupLocalities = Object.values(places)
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
const getDropdownContinentOptions = createDropdownSelector(CONTINENT, 15)
const getDropdownCountryOptions = createDropdownSelector(COUNTRY)
const getDropdownDistrictOptions = createDropdownSelector(DISTRICT)
const getDropdownProvinceOptions = createDropdownSelector(PROVINCE)
const getDropdownAllOptions = createDropdownSelector(ALL)

export default {
  getDropdownAllOptions,
  getDropdownContinentOptions,
  getDropdownCountryOptions,
  getDropdownDistrictOptions,
  getDropdownProvinceOptions,
  getNextPlaceIdFromFilter,
  getPlaceAncestorsById,
  getPlaceOption,
  getPlacesArrayByFilter,
  getPlacesSortedArray,
  getPrevPlaceIdFromFilter,
}
