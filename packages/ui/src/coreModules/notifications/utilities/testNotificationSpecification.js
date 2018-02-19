import validateAgainstSchema from 'common/es5/jsonSchema/validateAgainstSchema'

import { notification } from '../schemas'

const testNotificationSpecification = notificationToTest => {
  return validateAgainstSchema(notification, notificationToTest, {
    throwOnError: true,
  })
}

export default testNotificationSpecification
