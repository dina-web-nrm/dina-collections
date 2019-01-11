import { createSelector } from 'reselect'

export const getAllFreeTextSearchResults = createSelector(
  searchQueryResultsMap => searchQueryResultsMap,
  searchQueryResultsMap => {
    return Object.values(searchQueryResultsMap || {}).reduce(
      (allResults, { matchingTags, searchOption }) => {
        if (searchOption.other.tagType) {
          return allResults
        }
        return allResults.concat(matchingTags)
      },
      []
    )
  }
)

export const getAllFreeTextQueries = createSelector(
  searchQueryResultsMap => searchQueryResultsMap,
  searchQueryResultsMap => {
    return Object.keys(searchQueryResultsMap || {}).reduce(
      (allResults, searchQuery) => {
        const { searchOption } = searchQueryResultsMap[searchQuery]
        if (searchOption.other.tagType) {
          return allResults
        }
        return allResults.push(searchQuery)
      },
      []
    )
  }
)

export const getNumberOfFreeTextSearchResults = createSelector(
  getAllFreeTextSearchResults,
  allResults => {
    return allResults.length
  }
)
export const getNumberOfSelectedFreeTextResults = createSelector(
  getAllFreeTextSearchResults,
  allResults => {
    return allResults.reduce((count, { selected }) => {
      if (!selected) {
        return count
      }

      return count + 1
    }, 0)
  }
)
