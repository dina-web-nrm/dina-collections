import notificationSelectors from 'coreModules/notifications/globalSelectors'
import { globalSelectors as layoutGlobalSelectors } from './keyObjectModule'
import { APPLICATION_LAYER_VIEW, APPLICATION_LAYER_MODAL } from './constants'

const getRightSidebarIsOpen = globalState => {
  const notification = notificationSelectors.getPrioritizedNotificationByDisplayType(
    globalState,
    'inline'
  )
  return !!notification
}

const getRightSidebarIsClosed = globalState => {
  return !getRightSidebarIsOpen(globalState)
}

const getApplicationInModalLayer = globalState => {
  return (
    layoutGlobalSelectors.get.applicationLayer(globalState) ===
    APPLICATION_LAYER_MODAL
  )
}

const getApplicationInViewLayer = globalState => {
  return (
    layoutGlobalSelectors.get.applicationLayer(globalState) ===
    APPLICATION_LAYER_VIEW
  )
}

export default {
  getApplicationInModalLayer,
  getApplicationInViewLayer,
  getRightSidebarIsClosed,
  getRightSidebarIsOpen,
}
