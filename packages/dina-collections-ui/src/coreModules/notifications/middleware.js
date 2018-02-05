import { COLLISION_REPLACE } from './constants'
import { NOTIFICATIONS_CREATE_NOTIFICATION } from './actionTypes'
import globalSelectors from './globalSelectors'
import { createNotification, removeNotification } from './actionCreators'

export default function notificationMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    const result = next(action)

    const terminateActionMap = globalSelectors.getSpecificationTerminateActionMap(
      getState()
    )

    if (terminateActionMap[action.type]) {
      terminateActionMap[action.type].forEach(type => {
        const activeNotifictions = globalSelectors.getNotificationsByType(
          getState(),
          type
        )

        activeNotifictions.forEach(({ sequentialId }) => {
          dispatch(removeNotification({ sequentialId }))
        })
      })
    }

    const triggerActionMap = globalSelectors.getSpecificationTriggerActionMap(
      getState()
    )

    if (triggerActionMap[action.type]) {
      triggerActionMap[action.type].forEach(type => {
        dispatch(createNotification({ type }))
      })
    }

    switch (action.type) {
      case NOTIFICATIONS_CREATE_NOTIFICATION: {
        const {
          sequentialId: currentSequentialId,
          collision,
          type,
        } = action.payload
        if (collision === COLLISION_REPLACE) {
          const activeNotificationsSameType = globalSelectors.getNotificationsByType(
            getState(),
            type
          )
          activeNotificationsSameType.forEach(({ sequentialId }) => {
            if (currentSequentialId !== sequentialId) {
              dispatch(removeNotification({ sequentialId }))
            }
          })
        }

        break
      }

      default:
        break
    }
    return result
  }
}
