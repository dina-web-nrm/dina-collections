import wrapSelectors from 'utilities/wrapSelectors'
import notificationSelectors from 'coreModules/notifications/globalSelectors'
import * as selectors from './selectors'

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

export const globalSelectors = {
  getRightSidebarIsClosed,
  getRightSidebarIsOpen,
}

export default wrapSelectors(selectors, globalSelectors)
