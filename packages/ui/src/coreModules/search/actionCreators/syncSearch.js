import getCurrentUTCTimestamp from 'common/es5/date/getCurrentUTCTimestamp'
import crudActionCreators from 'coreModules/crud/actionCreators'
import { actionCreators, globalSelectors } from '../keyObjectModule'

export default function syncSearch({ resource = 'searchSpecimen' }) {
  const getMany =
    crudActionCreators[resource] && crudActionCreators[resource].getMany
  if (!getMany) {
    throw new Error(`Cant find actionCreator getMany for resource: ${resource}`)
  }

  const setLastUpdatedAt = actionCreators.set[':resource.lastUpdatedAt']
  if (!setLastUpdatedAt) {
    throw new Error(
      `Cant find action creator to set lastUpdatedAt for resource: ${resource}`
    )
  }

  return (dispatch, getState) => {
    const state = getState()

    const lastUpdatedAt = globalSelectors.get[':resource.lastUpdatedAt'](
      state,
      {
        resource,
      }
    )

    const nextLastUpdatedAt = getCurrentUTCTimestamp()

    let updateQueryParams = {
      limit: 100000,
    }
    let resourcesToRemoveQueryParams = {
      filter: {
        deactivated: true,
      },
      limit: 100000,
    }

    if (lastUpdatedAt) {
      updateQueryParams = {
        filter: {
          updatedAfter: lastUpdatedAt,
        },
      }
      resourcesToRemoveQueryParams = {
        filter: {
          ...resourcesToRemoveQueryParams.filter,
          updatedAfter: lastUpdatedAt,
        },
      }
    }

    return dispatch(
      getMany({
        queryParams: updateQueryParams,
      })
    ).then(() => {
      return dispatch(
        getMany({
          include: null,
          queryParams: resourcesToRemoveQueryParams,
          relationships: null,
          removeFromState: true,
        })
      ).then(() => {
        dispatch(setLastUpdatedAt(nextLastUpdatedAt, { resource }))
        return true
      })
    })
  }
}
