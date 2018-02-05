import { createSelector } from 'reselect'

export const getLocalState = state => {
  return state.taxonomy
}

export const getLookup = state => {
  return state.lookup
}

export const getLookupError = createSelector(getLookup, lookup => lookup.error)

export const getLookupLoading = createSelector(
  getLookup,
  lookup => lookup.loading
)

export const getLookupResult = createSelector(
  getLookup,
  lookup => lookup.result
)

export const getLookupSearch = createSelector(
  getLookup,
  lookup => lookup.search
)

export const getLookupSearchFilterName = createSelector(
  getLookup,
  lookup => lookup.searchFilterName
)

export const getLookupSearchType = createSelector(
  getLookup,
  lookup => lookup.searchType
)
