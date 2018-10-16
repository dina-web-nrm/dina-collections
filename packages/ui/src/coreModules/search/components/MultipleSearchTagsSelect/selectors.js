import { createSelector } from 'reselect'

export const getAllSearchResults = createSelector(
  searchQueryResultsMap => searchQueryResultsMap,
  searchQueryResultsMap => {
    return Object.values(searchQueryResultsMap || {}).reduce(
      (allResults, { matchingTags }) => {
        return allResults.concat(matchingTags)
      },
      []
    )
  }
)
export const getNumberOfSearchResults = createSelector(
  getAllSearchResults,
  allResults => allResults.length
)
export const getNumberOfSelectedResults = createSelector(
  getAllSearchResults,
  allResults => {
    return allResults.reduce((count, { selected }) => {
      if (!selected) {
        return count
      }

      return count + 1
    }, 0)
  }
)
