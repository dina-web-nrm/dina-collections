import globalSelectors from '../globalSelectors'
import setShortcutsModalVisible from './setShortcutsModalVisible'
import setShortcutsModalHidden from './setShortcutsModalHidden'

export const getShowInfo = state => {
  return state.showInfo
}

export default function toggleShortcutsModal() {
  return (dispatch, getState) => {
    if (globalSelectors.getShowInfo(getState())) {
      return dispatch(setShortcutsModalHidden())
    }
    return dispatch(setShortcutsModalVisible())
  }
}
