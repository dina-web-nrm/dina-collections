import { push } from 'react-router-redux'
import globalSelectors from 'domainModules/localityService/globalSelectors'

export default function redirectToNext(currentId) {
  return (dispatch, getState) => {
    const nextId = globalSelectors.getNextCuratedLocalityIdFromFilter(
      getState(),
      currentId
    )
    dispatch(push(`/app/localities/${nextId}/edit`))
  }
}
