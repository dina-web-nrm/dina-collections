import { createSelector } from 'reselect'

import crudSelectors from 'coreModules/crud/globalSelectors'
import getSecondArgument from 'utilities/getSecondArgument'
import wrapSelectors from 'utilities/wrapSelectors'
import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import { getParentId, getRelationshipItemId } from 'coreModules/crud/utilities'
import { mapTaxonNameToOption } from './utilities'
import * as selectors from './selectors'

import {
  ALL,
  FAMILY,
  GENUS,
  ORDER,
  MISSING_RANK,
  SPECIES,
  SUBSPECIES,
} from './constants'

const {
  taxon: { getItemsObject: getTaxa, getAll: getTaxaArray, getOne: getTaxon },
  taxonName: {
    getItemsObject: getTaxonNames,
    getAll: getTaxonNamesArray,
    getOne: getTaxonName,
  },
} = crudSelectors

const getTaxonNamesSortedArray = createSelector(
  getTaxonNamesArray,
  taxaArray => {
    return taxaArray.sort(({ attributes: a = {} }, { attributes: b = {} }) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
  }
)

const getTaxonNamesArrayByFilter = createSelector(
  getTaxonNamesSortedArray,
  getSecondArgument,
  (taxaArray, filter = {}) => {
    const {
      group: groupFilter,
      limit: limitFilter,
      offset = 0,
      searchQuery: searchQueryFilter,
    } = filter
    let filteredTaxonNames = [...taxaArray]

    if (searchQueryFilter) {
      const lowerCaseSearchQuery = searchQueryFilter.toLowerCase()
      const firstLetterMatches = filteredTaxonNames.filter(
        ({ attributes: { name } = {} }) => {
          return name && name.toLowerCase().indexOf(lowerCaseSearchQuery) === 0
        }
      )

      const otherMatches = filteredTaxonNames.filter(
        ({ attributes: { name } = {} }) => {
          return name && name.toLowerCase().indexOf(lowerCaseSearchQuery) > 0
        }
      )

      filteredTaxonNames = [...firstLetterMatches, ...otherMatches]
    }

    if (groupFilter) {
      filteredTaxonNames = filteredTaxonNames.filter(
        ({ attributes: { rank } = {} }) => {
          return rank ? rank === groupFilter : groupFilter === MISSING_RANK
        }
      )
    }

    if (limitFilter) {
      return filteredTaxonNames.splice(offset, limitFilter)
    }

    return filteredTaxonNames
  }
)

const getTaxonNameOptions = createSelector(
  [getTaxonNamesSortedArray],
  taxonNames => {
    return taxonNames
      .map(({ id, attributes = {} }) => {
        const { name } = attributes
        if (!name) {
          return null
        }

        return {
          key: id,
          text: capitalizeFirstLetter(name),
          value: id,
        }
      })
      .filter(option => !!option)
  }
)

const getTaxonNamesWithAcceptedToTaxon = createSelector(
  getTaxonNamesSortedArray,
  taxonNames => {
    return taxonNames.filter(
      ({ attributes: { acceptedToTaxon } = {} }) => !!acceptedToTaxon
    )
  }
)

const getTaxonNameOption = createSelector(getTaxonName, taxonName => {
  return taxonName && mapTaxonNameToOption(taxonName)
})

const getTaxaSortedArray = createSelector(getTaxaArray, taxaArray => {
  return taxaArray.sort(({ attributes: a = {} }, { attributes: b = {} }) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })
})

const getTaxonNameResourceFromRelation = (
  taxonNameResources,
  taxonNameRelationResource
) => {
  const taxonNameId = taxonNameRelationResource && taxonNameRelationResource.id
  return taxonNameId && taxonNameResources && taxonNameResources[taxonNameId]
}

const getTaxaArrayByFilter = createSelector(
  getTaxaSortedArray,
  getTaxonNames,
  getSecondArgument,
  (taxaArray, taxonNames, filter = {}) => {
    const {
      group: groupFilter,
      limit: limitFilter,
      offset = 0,
      parentId: parentIdFilter,
      searchQuery: searchQueryFilter,
    } = filter
    let filteredTaxa = [...taxaArray]

    if (parentIdFilter) {
      filteredTaxa = filteredTaxa.filter(taxon => {
        return getParentId(taxon) === parentIdFilter
      })
    }

    if (searchQueryFilter && false) {
      const lowerCaseSearchQuery = searchQueryFilter.toLowerCase()
      const firstLetterMatches = filteredTaxa.filter(
        ({ acceptedTaxonName }) => {
          const taxonName = getTaxonNameResourceFromRelation(
            taxonNames,
            acceptedTaxonName
          )
          return (
            taxonName &&
            taxonName.name &&
            taxonName.name.toLowerCase().indexOf(lowerCaseSearchQuery) === 0
          )
        }
      )

      const otherMatches = filteredTaxa.filter(({ acceptedTaxonName }) => {
        const taxonName = getTaxonNameResourceFromRelation(
          taxonNames,
          acceptedTaxonName
        )
        return (
          taxonName &&
          taxonName.name &&
          taxonName.name.toLowerCase().indexOf(lowerCaseSearchQuery) > 0
        )
      })

      filteredTaxa = [...firstLetterMatches, ...otherMatches]
    }

    if (groupFilter && false) {
      filteredTaxa = filteredTaxa.filter(({ acceptedTaxonName }) => {
        const taxonName = getTaxonNameResourceFromRelation(
          taxonNames,
          acceptedTaxonName
        )
        return taxonName && taxonName.rank
          ? taxonName.rank === groupFilter
          : groupFilter === MISSING_RANK
      })
    }

    if (limitFilter) {
      return filteredTaxa.splice(offset, limitFilter)
    }

    return filteredTaxa
  }
)

const getTaxonAncestorsAcceptedTaxonNameById = createSelector(
  getTaxa,
  getTaxonNames,
  getSecondArgument,
  (taxa, taxonNames, currentId) => {
    const ancestors = []
    const walkUp = taxon => {
      const acceptedTaxonNameId = getRelationshipItemId({
        item: taxon,
        relationKey: 'acceptedTaxonName',
      })
      if (taxonNames && acceptedTaxonNameId) {
        ancestors.push(taxonNames[acceptedTaxonNameId])
      }
      const parentId = getParentId(taxon)
      if (parentId) {
        const next = taxa[parentId]
        if (next) {
          walkUp(next)
        }
      }
    }

    const current = taxa[currentId]
    if (!current) {
      return ancestors
    }

    walkUp(current)

    return ancestors.reverse()
  }
)

const getNextTaxonIdFromFilter = createSelector(
  getTaxaArrayByFilter,
  getSecondArgument,
  (taxaArray, currentId) => {
    const currentIndex = taxaArray.findIndex(element => {
      return element.id === currentId
    })
    const nextIndex = Number(currentIndex) + 1
    const element = taxaArray[nextIndex]
    return element.id
  }
)

const getPrevTaxonIdFromFilter = createSelector(
  getTaxaArrayByFilter,
  getSecondArgument,
  (taxaArray, currentId) => {
    const currentIdex = taxaArray.findIndex(element => {
      return element.id === currentId
    })

    return taxaArray[Number(currentIdex) - 1].id
  }
)

const createDropdownSelector = (groupFilter, numberOfResults = 6) => {
  return createSelector(
    [getTaxa, getSecondArgument],
    (taxa, searchQuery = '') => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase()
      const mappedGroupTaxa = Object.values(taxa)
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

      const firstLetterMatches = mappedGroupTaxa.filter(({ text }) => {
        if (!searchQuery) {
          return true
        }
        return text && text.toLowerCase().indexOf(lowerCaseSearchQuery) === 0
      })

      const otherMatches = mappedGroupTaxa.filter(({ text }) => {
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
const getDropdownFamilyOptions = createDropdownSelector(FAMILY)
const getDropdownGenusOptions = createDropdownSelector(GENUS)
const getDropdownOrderOptions = createDropdownSelector(ORDER)
const getDropdownSpeciesOptions = createDropdownSelector(SPECIES)
const getDropdownSubspeciesOptions = createDropdownSelector(SUBSPECIES)

export default wrapSelectors(selectors, {
  getDropdownAllOptions,
  getDropdownFamilyOptions,
  getDropdownGenusOptions,
  getDropdownOrderOptions,
  getDropdownSpeciesOptions,
  getDropdownSubspeciesOptions,
  getNextTaxonIdFromFilter,
  getPrevTaxonIdFromFilter,
  getTaxaArrayByFilter,
  getTaxaSortedArray,
  getTaxonAncestorsAcceptedTaxonNameById,
  getTaxonNameOption,
  getTaxonNameOptions,
  getTaxonNamesArrayByFilter,
  getTaxonNamesSortedArray,
  getTaxonNamesWithAcceptedToTaxon,
})
