const formatAsTimestamp = require('common/src/date/formatAsTimestamp')
const createLog = require('../../../../utilities/log')

const log = createLog(
  'lib/data/hooks/factories/createRegisterResourceActivityHook'
)

module.exports = function createRegisterResourceActivityHook({
  action,
  service,
  includeDiff = false,
  includeSnapshot = false,
}) {
  return ({ item, requestId, resource, serviceInteractor, user }) => {
    return Promise.resolve().then(() => {
      const { id, internals } = item
      const attributes = {
        action,
        requestId,
        resource,
        resourceId: id,
        service,
        userId: user && user.id,
      }
      if (internals.createdAt) {
        attributes.srcCreatedAt = formatAsTimestamp(internals.createdAt)
      }

      if (internals.updatedAt) {
        attributes.srcUpdatedAt = formatAsTimestamp(internals.updatedAt)
      }

      if (internals.deactivatedAt) {
        attributes.srcDeactivatedAt = formatAsTimestamp(internals.deactivatedAt)
      }

      if (includeDiff) {
        attributes.diff = item.diff
      }

      if (includeSnapshot) {
        attributes.snapshot = internals
      }

      const request = {
        body: {
          data: {
            attributes,
          },
        },
      }

      return serviceInteractor
        .detachedCall({
          // operationType: 'create',
          operationId: 'resourceActivityCreate',
          request,
        })
        .catch(err => {
          log.err(err.stack)
        })
    })
  }
}
