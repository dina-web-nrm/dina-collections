import openLeftSidebar from './openLeftSidebar'
import closeLeftSidebar from './closeLeftSidebar'
import globalSelectors from '../globalSelectors'

export default function toggeLeftSidebar() {
  return (dispatch, getState) => {
    const leftSidebarIsOpen = globalSelectors.getLeftSidebarIsOpen(getState())
    if (leftSidebarIsOpen) {
      return dispatch(closeLeftSidebar())
    }
    return dispatch(openLeftSidebar())
  }
}
