import crudActionCreators from 'coreModules/crud/actionCreators'
import { actionCreators } from '../keyObjectModule'

export default function search(
  {
    aggregations,
    query,
    resource,
    idsOnly = true,
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
        idsOnly: false,
        limit: 100000,
        query,
        throwError: true,
      })
    ).then(res => {
      const items = idsOnly
        ? res.map(({ id }) => {
            return id
          })
        : res

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
