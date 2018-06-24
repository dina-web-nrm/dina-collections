import { createSelector } from 'reselect'

export const getAllSearchResults = createSelector(
  searchQueryResultsMap => searchQueryResultsMap,
  searchQueryResultsMap => {
    return Object.values(searchQueryResultsMap || {}).reduce(
      (allResults, searchQueryResults) => {
        return allResults.concat(searchQueryResults)
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
export const getSelectedOptions = createSelector(
  (_, selectedStrings) => selectedStrings,
  selectedStrings => {
    const selectedOptions = selectedStrings.map(string => {
      return {
        key: string,
        text: string,
        type: 'string',
        value: string,
      }
    })
    return selectedOptions
  }
)
