import { push } from 'react-router-redux'
import globalSelectors from '../globalSelectors'

export default function redirectToPrev(currentId) {
  return (dispatch, getState) => {
    const prevId = globalSelectors.getPrevPlaceIdFromFilter(
      getState(),
      currentId
    )
    dispatch(push(`/app/localities/${prevId}/edit`))
  }
}
