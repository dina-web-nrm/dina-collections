import { push } from 'react-router-redux'
import globalSelectors from '../globalSelectors'

export default function redirectToNext(currentId) {
  return (dispatch, getState) => {
    const nextId = globalSelectors.getNextPlaceIdFromFilter(
      getState(),
      currentId
    )
    dispatch(push(`/app/localities/${nextId}/edit`))
  }
}
