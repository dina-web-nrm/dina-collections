import { createSelector } from 'reselect'

import crudSelectors from 'coreModules/crud/globalSelectors'
import getSecondArgument from 'utilities/getSecondArgument'
import wrapSelectors from 'utilities/wrapSelectors'
import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import { getParentId, getRelationshipItemId } from 'coreModules/crud/utilities'
import { mapTaxonNameToOption } from './utilities'
import * as selectors from './selectors'
import { MISSING_RANK } from './constants'

const {
  taxon: { getItemsObject: getTaxa, getAll: getTaxaArray },
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
  getTaxa,
  getTaxonNamesSortedArray,
  (taxonObject, taxonNames) => {
    return taxonNames.filter(
      ({ attributes: { acceptedToTaxon } = {} }) => !!acceptedToTaxon
    )
  }
)

const getTaxonNameOption = createSelector(
  getTaxonName,
  taxonName => {
    return taxonName && mapTaxonNameToOption(taxonName)
  }
)

const getTaxaSortedArray = createSelector(
  getTaxaArray,
  taxaArray => {
    return taxaArray.sort(({ attributes: a = {} }, { attributes: b = {} }) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
  }
)

const getTaxonOptions = createSelector(
  getTaxaSortedArray,
  getTaxonNames,
  (taxaArray, taxonNames) => {
    return taxaArray
      .map(taxon => {
        const acceptedTaxonNameId = getRelationshipItemId({
          item: taxon,
          relationKey: 'acceptedTaxonName',
        })
        if (!acceptedTaxonNameId) {
          return null
        }

        const acceptedTaxonName = taxonNames[acceptedTaxonNameId]
        const name =
          acceptedTaxonName &&
          acceptedTaxonName.attributes &&
          acceptedTaxonName.attributes.name

        return {
          key: taxon.id,
          text: capitalizeFirstLetter(name),
          value: taxon.id,
        }
      })
      .filter(item => !!item)
  }
)

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

    if (searchQueryFilter) {
      const lowerCaseSearchQuery = searchQueryFilter.toLowerCase()
      const firstLetterMatches = filteredTaxa.filter(taxon => {
        const acceptedTaxonNameId = getRelationshipItemId({
          item: taxon,
          relationKey: 'acceptedTaxonName',
        })

        const taxonName = taxonNames[acceptedTaxonNameId]
        return (
          taxonName &&
          taxonName.attributes &&
          taxonName.attributes.name &&
          taxonName.attributes.name
            .toLowerCase()
            .indexOf(lowerCaseSearchQuery) === 0
        )
      })

      const otherMatches = filteredTaxa.filter(taxon => {
        const acceptedTaxonNameId = getRelationshipItemId({
          item: taxon,
          relationKey: 'acceptedTaxonName',
        })

        const taxonName = taxonNames[acceptedTaxonNameId]

        return (
          taxonName &&
          taxonName.attributes &&
          taxonName.attributes.name &&
          taxonName.attributes.name
            .toLowerCase()
            .indexOf(lowerCaseSearchQuery) > 0
        )
      })

      filteredTaxa = [...firstLetterMatches, ...otherMatches]
    }

    if (groupFilter) {
      filteredTaxa = filteredTaxa.filter(taxon => {
        const acceptedTaxonNameId = getRelationshipItemId({
          item: taxon,
          relationKey: 'acceptedTaxonName',
        })

        const taxonName = taxonNames[acceptedTaxonNameId]
        return taxonName &&
          taxonName.attributes.rank &&
          taxonName.attributes.rank
          ? taxonName.attributes.rank === groupFilter
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

export default wrapSelectors(selectors, {
  getTaxaArrayByFilter,
  getTaxaSortedArray,
  getTaxonAncestorsAcceptedTaxonNameById,
  getTaxonNameOption,
  getTaxonNameOptions,
  getTaxonNamesArrayByFilter,
  getTaxonNamesSortedArray,
  getTaxonNamesWithAcceptedToTaxon,
  getTaxonOptions,
})
