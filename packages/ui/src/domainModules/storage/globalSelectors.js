import { createSelector } from 'reselect'

import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import crudSelectors from 'coreModules/crud/globalSelectors'
import getSecondArgument from 'utilities/getSecondArgument'

import { ALL, GROUP_1, GROUP_2, GROUP_3, GROUP_4 } from './constants'

const {
  getItemsObject: getStorageLocations,
  getAll: getStorageLocationsArray,
} = crudSelectors.place

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
      filteredStorageLocations = filteredStorageLocations.filter(
        storageLocation => {
          return (
            (storageLocation.parent && storageLocation.parent.id) ===
            parentIdFilter
          )
        }
      )
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

const createDropdownSelector = (
  groupFilter,
  { showParentName = false, numberOfResults = 6 } = {}
) => {
  return createSelector(
    [getStorageLocations, getSecondArgument],
    (storageLocations, searchQuery = '') => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase()

      const mappedGroupStorageLocations = Object.values(storageLocations)
        .filter(
          ({ group }) => (groupFilter === ALL ? true : group === groupFilter)
        )
        .map(({ id, name, parent }) => {
          const parentName =
            showParentName &&
            parent &&
            parent.id &&
            storageLocations[parent.id] &&
            storageLocations[parent.id].name

          const text = parentName
            ? `${capitalizeFirstLetter(name)} (in ${capitalizeFirstLetter(
                parentName
              )})`
            : capitalizeFirstLetter(name)

          return {
            key: id,
            text,
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

const getDropdownAllOptionsWithParentName = createDropdownSelector(ALL, {
  showParentName: true,
})
const getDropdownGroup1OptionsWithParentName = createDropdownSelector(GROUP_1, {
  showParentName: true,
})
const getDropdownGroup2OptionsWithParentName = createDropdownSelector(GROUP_2, {
  showParentName: true,
})
const getDropdownGroup3OptionsWithParentName = createDropdownSelector(GROUP_3, {
  showParentName: true,
})
const getDropdownGroup4OptionsWithParentName = createDropdownSelector(GROUP_4, {
  showParentName: true,
})

const createGetDropdownAllOptions = ({ showParentName }) => {
  return showParentName
    ? getDropdownAllOptionsWithParentName
    : getDropdownAllOptions
}
const createGetDropdownGroup1Options = ({ showParentName }) => {
  return showParentName
    ? getDropdownGroup1OptionsWithParentName
    : getDropdownGroup1Options
}
const createGetDropdownGroup2Options = ({ showParentName }) => {
  return showParentName
    ? getDropdownGroup2OptionsWithParentName
    : getDropdownGroup2Options
}
const createGetDropdownGroup3Options = ({ showParentName }) => {
  return showParentName
    ? getDropdownGroup3OptionsWithParentName
    : getDropdownGroup3Options
}
const createGetDropdownGroup4Options = ({ showParentName }) => {
  return showParentName
    ? getDropdownGroup4OptionsWithParentName
    : getDropdownGroup4Options
}

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
  createGetDropdownAllOptions,
  createGetDropdownGroup1Options,
  createGetDropdownGroup2Options,
  createGetDropdownGroup3Options,
  createGetDropdownGroup4Options,
  getNextStorageLocationIdFromFilter,
  getPrevStorageLocationIdFromFilter,
  getStorageLocationAncestorsById,
  getStorageLocationOption,
  getStorageLocationsArrayByFilter,
  getStorageLocationsSortedArray,
}
