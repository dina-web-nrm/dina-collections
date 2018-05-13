import { createSelector } from 'reselect'

import crudSelectors from 'coreModules/crud/globalSelectors'
import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import getSecondArgument from 'utilities/getSecondArgument'
import { getParentId } from 'coreModules/crud/utilities'

import { ALL, CONTINENT, COUNTRY, DISTRICT, PROVINCE } from './constants'

const { getItemsObject, getAll } = crudSelectors.place

const getPlacesSortedArray = createSelector(getAll, placesArray => {
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
        return getParentId(locality) === parentIdFilter
      })
    }

    if (searchQueryFilter) {
      const lowerCaseSearchQuery = searchQueryFilter.toLowerCase()
      const firstLetterMatches = filteredPlaces.filter(({ attributes }) => {
        return (
          attributes.name &&
          attributes.name.toLowerCase().indexOf(lowerCaseSearchQuery) === 0
        )
      })

      const otherMatches = filteredPlaces.filter(({ attributes }) => {
        return (
          attributes.name &&
          attributes.name.toLowerCase().indexOf(lowerCaseSearchQuery) > 0
        )
      })

      filteredPlaces = [...firstLetterMatches, ...otherMatches]
    }

    if (groupFilter) {
      filteredPlaces = filteredPlaces.filter(
        ({ attributes }) => attributes.group === groupFilter
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
  getItemsObject,
  getSecondArgument,
  (places, currentId) => {
    const ancestors = []
    const walkUp = item => {
      ancestors.push(item)
      const parentId = getParentId(item)
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
    const currentIndex = placesArray.findIndex(element => {
      return element.id === currentId
    })

    return placesArray[Number(currentIndex) - 1].id
  }
)

const getPlaceOption = createSelector(
  [getItemsObject, getSecondArgument],
  (places, id) => {
    const place = places[id]
    if (!place) {
      return null
    }
    return {
      key: place.id,
      text: capitalizeFirstLetter(place.attributes.name),
      value: place.id,
    }
  }
)

const createDropdownSelector = (groupFilter, numberOfResults = 6) => {
  return createSelector(
    [getItemsObject, getSecondArgument],
    (places, searchQuery = '') => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase()
      const mappedGroupLocalities = Object.values(places)
        .filter(
          ({ attributes }) =>
            groupFilter === 'all' ? true : attributes.group === groupFilter
        )
        .map(({ id, attributes }) => {
          return {
            key: id,
            text: capitalizeFirstLetter(attributes.name),
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
