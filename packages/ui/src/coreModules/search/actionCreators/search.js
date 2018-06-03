import crudGlobalSelectors from 'coreModules/crud/globalSelectors'
import asyncFilter from 'common/es5/search/filter/async'
import { actionCreators } from '../keyObjectModule'

const updateSearchResult = actionCreators.set.searchState

let busy = false
let waitingQuery = null

export default function search({ query, resource = 'searchSpecimen' } = {}) {
  const getSearchItems = crudGlobalSelectors[resource].getAll
  if (!getSearchItems) {
    throw new Error(`Cant find selector getAll for resource: ${resource}`)
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
      items: searchSpecimens,
      query,
      resource,
    }).then(res => {
      busy = false
      dispatch(
        updateSearchResult({
          items: res,
        })
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
