import { NOTIFICATIONS_CREATE_NOTIFICATION } from '../actionTypes'
import globalSelectors from '../globalSelectors'
import { buildNotification } from '../utilities'

export default function createNotification({
  type,
  ...specificationOverrides
}) {
  return (dispatch, getState) => {
    const notificationSpecification = globalSelectors.getSpecificationByType(
      getState(),
      type
    )

    const newNotification = buildNotification({
      ...notificationSpecification,
      ...specificationOverrides,
    })

    return dispatch({
      payload: newNotification,
      type: NOTIFICATIONS_CREATE_NOTIFICATION,
    })
  }
}
