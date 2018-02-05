import updateUserPreferences from './updateUserPreferences'
import selectors from '../globalSelectors'

export default function updateUserPreference(key, value) {
  return (dispatch, getState) => {
    const currentPreferences = selectors.getUserPreferences(getState()) || {}

    return dispatch(
      updateUserPreferences({
        ...currentPreferences,
        [key]: value,
      })
    )
  }
}
