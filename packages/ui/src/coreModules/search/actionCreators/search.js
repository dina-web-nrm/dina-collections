import crudActionCreators from 'coreModules/crud/actionCreators'
import { actionCreators } from '../keyObjectModule'

export default function search({ query, resource } = {}) {
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
          idsOnly: true,
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
      dispatch(
        updateSearchResult(
          {
            items: res.map(({ id }) => {
              return id
            }),
          },
          { resource }
        )
      )
    })
  }
}
