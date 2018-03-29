import { createSelector } from 'reselect'

import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import storageServiceSelectors from 'domainModules/storageService/globalSelectors'
import getSecondArgument from 'utilities/getSecondArgument'

const getStorageDropdownOptions = createSelector(
  [storageServiceSelectors.getStorageLocations, getSecondArgument],
  (storageLocations, searchQuery = '') => {
    const storageLocationOptions = Object.values(storageLocations).map(
      ({ id, name }) => {
        return {
          key: id,
          text: capitalizeFirstLetter(name),
          value: id,
        }
      }
    )

    if (!searchQuery) {
      return storageLocationOptions.slice(0, 10)
    }

    const lowerCaseSearchQuery = searchQuery.toLowerCase()

    const firstLetterMatches = storageLocationOptions.filter(({ text }) => {
      return text && text.toLowerCase().indexOf(lowerCaseSearchQuery) === 0
    })

    const otherMatches = storageLocationOptions.filter(({ text }) => {
      return text && text.toLowerCase().indexOf(lowerCaseSearchQuery) > 0
    })

    return [...firstLetterMatches, ...otherMatches].slice(0, 10)
  }
)

const getStorageLocationOption = createSelector(
  [storageServiceSelectors.getStorageLocations, getSecondArgument],
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
  getStorageDropdownOptions,
  getStorageLocationOption,
}
