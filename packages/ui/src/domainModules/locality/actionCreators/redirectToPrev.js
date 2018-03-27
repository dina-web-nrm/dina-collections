import { push } from 'react-router-redux'
import globalSelectors from 'domainModules/localityService/globalSelectors'

export default function redirectToPrev(currentId) {
  return (dispatch, getState) => {
    const prevId = globalSelectors.getPrevCuratedLocalityIdFromFilter(
      getState(),
      currentId
    )
    dispatch(push(`/app/localities/${prevId}/edit`))
  }
}
