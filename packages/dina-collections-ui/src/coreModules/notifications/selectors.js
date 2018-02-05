import { createSelector } from 'reselect'

export const getLocalState = state => {
  return state.notifications
}

const getSecondArgument = (_, secondArg) => secondArg

export const getSpecifications = state => {
  return state.specifications
}

export const getSpecificationByType = (state, type) => {
  const specifications = getSpecifications(state)
  if (!specifications[type]) {
    return null
  }
  return specifications[type]
}

export const getSpecificationArrayWithTerminateActions = createSelector(
  getSpecifications,
  specifications => {
    return Object.keys(specifications)
      .map(key => {
        return specifications[key]
      })
      .filter(registeredNotification => registeredNotification.terminateActions)
  }
)

export const getSpecificationArrayWithTriggerActions = createSelector(
  getSpecifications,
  specifications => {
    return Object.keys(specifications)
      .map(key => {
        return specifications[key]
      })
      .filter(registeredNotification => registeredNotification.triggerActions)
  }
)

export const getSpecificationTerminateActionMap = createSelector(
  getSpecificationArrayWithTerminateActions,
  registeredNotifications => {
    return registeredNotifications.reduce(
      (terminateActionMap, { type, terminateActions = [] }) => {
        return terminateActions.reduce((obj, action) => {
          if (obj[action]) {
            return {
              ...obj,
              [action]: [...obj[action], type],
            }
          }

          return {
            ...obj,
            [action]: [type],
          }
        }, terminateActionMap)
      },
      {}
    )
  }
)

export const getSpecificationTriggerActionMap = createSelector(
  getSpecificationArrayWithTriggerActions,
  specifications => {
    return specifications.reduce(
      (triggerActionMap, { type, triggerActions = [] }) => {
        return triggerActions.reduce((obj, action) => {
          if (obj[action]) {
            return {
              ...obj,
              [action]: [...obj[action], type],
            }
          }

          return {
            ...obj,
            [action]: [type],
          }
        }, triggerActionMap)
      },
      {}
    )
  }
)

export const getNotifications = state => {
  return state.activeNotifications
}

export const getNotificationsInArray = createSelector(
  getNotifications,
  activeNotifications => {
    const sequentialIds = Object.keys(activeNotifications)

    if (!sequentialIds.length) {
      return []
    }

    return sequentialIds.map(sequentialId => {
      return activeNotifications[sequentialId]
    })
  }
)

export const getNotificationsByType = createSelector(
  getNotificationsInArray,
  getSecondArgument,
  (activeNotificationsArray, selectedType) => {
    return (
      (activeNotificationsArray &&
        activeNotificationsArray.filter(({ type }) => type === selectedType)) ||
      []
    )
  }
)

export const getNotificationsByDisplayType = createSelector(
  getNotificationsInArray,
  getSecondArgument,
  (activeNotificationsArray, selectedDisplayType) => {
    return (
      activeNotificationsArray &&
      activeNotificationsArray.filter(
        ({ displayType }) => displayType === selectedDisplayType
      )
    )
  }
)

const getHighestPriorityAndOldestNotification = (
  highestSoFar,
  newCandidate
) => {
  if (!highestSoFar) {
    return newCandidate
  }

  if (highestSoFar.priority > newCandidate.priority) {
    return highestSoFar
  }

  if (highestSoFar.priority === newCandidate.priority) {
    return highestSoFar.sequentialId < newCandidate.sequentialId
      ? highestSoFar
      : newCandidate
  }

  return newCandidate
}

export const getPrioritizedNotificationByDisplayType = createSelector(
  getNotificationsByDisplayType,
  notifications => {
    return (
      notifications &&
      notifications.reduce(getHighestPriorityAndOldestNotification, null)
    )
  }
)
