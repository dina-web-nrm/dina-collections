import notificationSelectors from 'coreModules/notifications/globalSelectors'

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

export default {
  getRightSidebarIsClosed,
  getRightSidebarIsOpen,
}
