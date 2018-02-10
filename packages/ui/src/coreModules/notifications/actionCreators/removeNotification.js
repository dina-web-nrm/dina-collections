import { NOTIFICATIONS_REMOVE_NOTIFICATION } from '../actionTypes'

export default function removeNotification({ sequentialId }) {
  return {
    payload: { sequentialId },
    type: NOTIFICATIONS_REMOVE_NOTIFICATION,
  }
}
