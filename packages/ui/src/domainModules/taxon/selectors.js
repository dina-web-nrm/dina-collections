import { createSelector } from 'reselect'

import getSecondArgument from 'utilities/getSecondArgument'
import { MODULE_NAME } from './constants'
import { mapTaxonToOption } from './utilities'

export const getLocalState = state => {
  return state[MODULE_NAME]
}

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
