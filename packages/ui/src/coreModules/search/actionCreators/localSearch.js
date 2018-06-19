import crudGlobalSelectors from 'coreModules/crud/globalSelectors'
import asyncFilter from 'common/es5/search/filter/async'
import specimenFilterFunctions from 'common/es5/search/resources/specimen/filterFunctions'
import { actionCreators } from '../keyObjectModule'

let busy = false
let waitingQuery = null

export default function search({ query, resource = 'searchSpecimen' } = {}) {
  const getSearchItems = crudGlobalSelectors[resource].getAll
  if (!getSearchItems) {
    throw new Error(`Cant find selector getAll for resource: ${resource}`)
  }

  const updateSearchResult = actionCreators.set[':resource.searchState']
  if (!updateSearchResult) {
    throw new Error(
      `Cant find action creator to set searchState for resource: ${resource}`
    )
  }

  return (dispatch, getState) => {
    if (busy) {
      waitingQuery = JSON.parse(JSON.stringify(query))
      return null
    }
    busy = true
    const state = getState()
    const searchSpecimens = getSearchItems(state)
    return asyncFilter({
      filterFunctions: specimenFilterFunctions,
      items: searchSpecimens,
      query,
      resource,
    }).then(res => {
      busy = false
      dispatch(
        updateSearchResult(
          {
            items: res,
          },
          { resource }
        )
      )
      if (waitingQuery) {
        dispatch(
          search({
            query: waitingQuery,
          })
        )
        waitingQuery = null
      }
    })
  }
}
