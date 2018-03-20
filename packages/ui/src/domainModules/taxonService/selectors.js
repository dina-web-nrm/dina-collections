import { createSelector } from 'reselect'
import getSecondArgument from 'utilities/getSecondArgument'

import { MODULE_NAME } from './constants'

export const getLocalState = state => {
  return state[MODULE_NAME]
}

export const getResources = state => {
  return state.resources
}

export const getTaxa = createSelector(getResources, resources => {
  return resources.taxa
})

export const getTaxon = createSelector(
  [getTaxa, getSecondArgument],
  (taxa, id) => {
    return taxa[id]
  }
)

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
    return lookupResult.map(item => {
      return {
        key: item.id,
        text: item.scientificName,
        value: item.id,
      }
    })
  }
)

export const getLookupSearchQuery = createSelector(
  getLookup,
  lookup => lookup.searchQuery
)
