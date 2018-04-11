import { createSelector } from 'reselect'

import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import storageServiceSelectors from 'dataModules/storageService/globalSelectors'
import getSecondArgument from 'utilities/getSecondArgument'

import { ALL, GROUP_1, GROUP_2, GROUP_3, GROUP_4 } from './constants'

const {
  getStorageLocations,
  getStorageLocationsArray,
} = storageServiceSelectors

const getStorageLocationsSortedArray = createSelector(
  getStorageLocationsArray,
  storageLocationsArray => {
    return storageLocationsArray.sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
  }
)

const getStorageLocationsArrayByFilter = createSelector(
  getStorageLocationsSortedArray,
  getSecondArgument,
  (storageLocationsArray, filter = {}) => {
    const {
      group: groupFilter,
      limit: limitFilter,
      offset = 0,
      parentId: parentIdFilter,
      searchQuery: searchQueryFilter,
    } = filter
    let filteredStorageLocations = storageLocationsArray

    if (parentIdFilter) {
      filteredStorageLocations = filteredStorageLocations.filter(locality => {
        return (locality.parent && locality.parent.id) === parentIdFilter
      })
    }

    if (searchQueryFilter) {
      const lowerCaseSearchQuery = searchQueryFilter.toLowerCase()
      const firstLetterMatches = filteredStorageLocations.filter(({ name }) => {
        return name && name.toLowerCase().indexOf(lowerCaseSearchQuery) === 0
      })

      const otherMatches = filteredStorageLocations.filter(({ name }) => {
        return name && name.toLowerCase().indexOf(lowerCaseSearchQuery) > 0
      })

      filteredStorageLocations = [...firstLetterMatches, ...otherMatches]
    }

    if (groupFilter) {
      filteredStorageLocations = filteredStorageLocations.filter(
        ({ group }) => group === groupFilter
      )
    }

    if (limitFilter) {
      // avoid mutating filteredStorageLocations, as the mutation carried over
      // to future calls of this selector
      const storageLocationsToShow = [...filteredStorageLocations].splice(
        offset,
        limitFilter
      )
      return storageLocationsToShow
    }
    return filteredStorageLocations
  }
)

const getStorageLocationAncestorsById = createSelector(
  getStorageLocations,
  getSecondArgument,
  (storageLocations, currentId) => {
    const ancestors = []
    const walkUp = item => {
      ancestors.push(item)
      const parentId = item.parent && item.parent.id
      if (parentId) {
        const next = storageLocations[parentId]
        if (next) {
          walkUp(next)
        }
      }
    }

    const current = storageLocations[currentId]
    if (!current) {
      return ancestors
    }

    walkUp(current)

    return ancestors.reverse()
  }
)

const getNextStorageLocationIdFromFilter = createSelector(
  getStorageLocationsArrayByFilter,
  getSecondArgument,
  (storageLocationsArray, currentId) => {
    const currentIndex = storageLocationsArray.findIndex(element => {
      return element.id === currentId
    })
    const nextIndex = Number(currentIndex) + 1
    const element = storageLocationsArray[nextIndex]
    return element.id
  }
)

const getPrevStorageLocationIdFromFilter = createSelector(
  getStorageLocationsArrayByFilter,
  getSecondArgument,
  (storageLocationsArray, currentId) => {
    const currentIdex = storageLocationsArray.findIndex(element => {
      return element.id === currentId
    })

    return storageLocationsArray[Number(currentIdex) - 1].id
  }
)

const createDropdownSelector = (groupFilter, numberOfResults = 6) => {
  return createSelector(
    [getStorageLocations, getSecondArgument],
    (storageLocations, searchQuery = '') => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase()
      const mappedGroupStorageLocations = Object.values(storageLocations)
        .filter(
          ({ group }) => (groupFilter === ALL ? true : group === groupFilter)
        )
        .map(({ id, name }) => {
          return {
            key: id,
            text: capitalizeFirstLetter(name),
            value: id,
          }
        })

      const firstLetterMatches = mappedGroupStorageLocations.filter(
        ({ text }) => {
          if (!searchQuery) {
            return true
          }
          return text && text.toLowerCase().indexOf(lowerCaseSearchQuery) === 0
        }
      )

      const otherMatches = mappedGroupStorageLocations.filter(({ text }) => {
        if (!searchQuery) {
          return false
        }
        return text && text.toLowerCase().indexOf(lowerCaseSearchQuery) > 0
      })

      return [...firstLetterMatches, ...otherMatches].slice(0, numberOfResults)
    }
  )
}

const getDropdownAllOptions = createDropdownSelector(ALL)
const getDropdownGroup1Options = createDropdownSelector(GROUP_1)
const getDropdownGroup2Options = createDropdownSelector(GROUP_2)
const getDropdownGroup3Options = createDropdownSelector(GROUP_3)
const getDropdownGroup4Options = createDropdownSelector(GROUP_4)

const getStorageLocationOption = createSelector(
  [getStorageLocations, getSecondArgument],
  (storageLocations, id) => {
    const storageLocation = storageLocations[id]
    if (!storageLocation) {
      return null
    }
    return {
      key: storageLocation.id,
      text: capitalizeFirstLetter(storageLocation.name),
      value: storageLocation.id,
    }
  }
)

export default {
  getDropdownAllOptions,
  getDropdownGroup1Options,
  getDropdownGroup2Options,
  getDropdownGroup3Options,
  getDropdownGroup4Options,
  getNextStorageLocationIdFromFilter,
  getPrevStorageLocationIdFromFilter,
  getStorageLocationAncestorsById,
  getStorageLocationOption,
  getStorageLocationsArrayByFilter,
  getStorageLocationsSortedArray,
}
