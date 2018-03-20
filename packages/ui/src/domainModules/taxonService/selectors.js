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

export const getLookupResult = createSelector(getLookup, lookup =>
  (lookup.result || []).map(item => {
    return {
      key: item.id,
      title: item.scientificName,
    }
  })
)

export const getLookupSearch = createSelector(
  getLookup,
  lookup => lookup.search
)

export const getLookupSearchFilterName = createSelector(
  getLookup,
  lookup => lookup.searchFilterName
)
