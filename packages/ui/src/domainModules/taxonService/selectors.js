import { createSelector } from 'reselect'
import getSecondArgument from 'utilities/getSecondArgument'

import { MODULE_NAME } from './constants'
import { mapTaxonToOption } from './utilities'

export const getLocalState = state => {
  return state[MODULE_NAME]
}

export const getResources = state => {
  return state.resources
}

export const getTaxa = createSelector(getResources, resources => {
  return resources.taxa
})

export const getTaxon = (state, id) => {
  return getTaxa(state)[id]
}

export const getTaxonOption = createSelector(getTaxon, taxon => {
  return taxon && mapTaxonToOption(taxon)
})

export const getLookup = state => {
  return state.lookup
}

export const getLookupError = createSelector(getLookup, lookup => lookup.error)

export const getLookupLoading = createSelector(
  getLookup,
  lookup => lookup.loading
)

export const getLookupResult = createSelector(getLookup, lookup => {
  return lookup.result || []
})

export const getLookupDropdownOptions = createSelector(
  getLookupResult,
  lookupResult => {
    return lookupResult.map(mapTaxonToOption)
  }
)

export const getLookupSearchQueries = createSelector(
  getLookup,
  lookup => lookup.searchQueries
)

export const getLookupSearchQuery = createSelector(
  [getLookupSearchQueries, getSecondArgument],
  (searchQueries, inputName) => searchQueries[inputName]
)
