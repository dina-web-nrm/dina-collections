import crudActionCreators from 'coreModules/crud/actionCreators'
import { actionCreators } from '../keyObjectModule'

export default function search(
  {
    aggregations,
    excludeFields,
    idsInMeta = true,
    includeDeactivated,
    includeFields,
    limit = 100000,
    query,
    resource,
    sort,
    storeSearchResult = false,
    useScroll,
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
        idsInMeta,
        includeDeactivated,
        includeFields,
        limit,
        query,
        sort,
        throwError: true,
        useScroll,
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
