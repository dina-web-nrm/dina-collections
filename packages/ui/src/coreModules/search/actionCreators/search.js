import crudActionCreators from 'coreModules/crud/actionCreators'
import { actionCreators } from '../keyObjectModule'

export default function search({ query, resource, idsOnly = true } = {}) {
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
    const body = {
      data: {
        attributes: {
          idsOnly,
          query,
        },
      },
    }
    return dispatch(
      queryAc({
        body,
        throwError: true,
      })
    ).then(res => {
      const items = idsOnly
        ? res.map(({ id }) => {
            return id
          })
        : res

      dispatch(
        updateSearchResult(
          {
            items,
          },
          { resource }
        )
      )
    })
  }
}
