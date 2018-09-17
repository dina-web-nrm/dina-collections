import crudActionCreators from 'coreModules/crud/actionCreators'
import { actionCreators } from '../keyObjectModule'

export default function search(
  {
    aggregations,
    excludeFields,
    includeFields,
    limit = 100000,
    query,
    resource,
    sort,
    storeSearchResult = false,
  } = {}
) {
  const updateSearchResult = actionCreators.set[':resource.searchState']
  const queryAc = crudActionCreators[resource].query

  if (!queryAc) {
    throw new Error(`Cant find query action creator for resource: ${resource}`)
  }

  if (!updateSearchResult) {
    throw new Error(
      `Cant find action creator to set searchState for resource: ${resource}`
    )
  }

  return dispatch => {
    return dispatch(
      queryAc({
        aggregations,
        excludeFields,
        includeFields,
        limit,
        query,
        sort,
        throwError: true,
      })
    ).then(items => {
      if (storeSearchResult) {
        dispatch(
          updateSearchResult(
            {
              items,
            },
            { resource }
          )
        )
      }

      return items
    })
  }
}
