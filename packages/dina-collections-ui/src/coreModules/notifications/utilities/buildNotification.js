let sequentialId = 0 // eslint-disable-line no-underscore-dangle

const defaultSpecifications = {
  priority: 10,
}

const buildNotification = (notificationSpecification = {}) => {
  sequentialId += 1

  return {
    ...defaultSpecifications,
    ...notificationSpecification,
    sequentialId,
  }
}

export default buildNotification
