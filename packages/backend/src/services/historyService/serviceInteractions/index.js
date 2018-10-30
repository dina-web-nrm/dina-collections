const formatAsTimestamp = require('common/src/date/formatAsTimestamp')
const createLog = require('../../../utilities/log')

const log = createLog(
  'lib/data/hooks/factories/createRegisterResourceActivityHook'
)

const createResourceActivity = ({
  action,
  includeDiff,
  includeSnapshot,
  item,
  requestId,
  resource,
  service,
  user,
}) => {
  const { id, internals } = item
  const attributes = {
    action,
    requestId,
    resource,
    resourceId: id,
    service,
    srcSchemaVersion: internals.schemaVersion,
    userId: user && user.id,
    username: user && user.name,
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

  return {
    attributes,
  }
}

exports.createRegisterResourceActivityHook = function createRegisterResourceActivityHook({
  action,
  service,
  includeDiff = false,
  includeSnapshot = false,
}) {
  return ({ item, requestId, resource, serviceInteractor, user }) => {
    return Promise.resolve().then(() => {
      const resourceActivity = createResourceActivity({
        action,
        includeDiff,
        includeSnapshot,
        item,
        requestId,
        resource,
        service,
        user,
      })

      const request = {
        body: {
          data: resourceActivity,
        },
      }

      return serviceInteractor
        .detachedCall({
          operationId: 'resourceActivityCreate',
          request,
        })
        .catch(err => {
          log.err(err.stack)
        })
    })
  }
}

exports.bulkCreateResourceActivities = ({
  action,
  includeDiff = false,
  includeSnapshot = false,
  requestId,
  resource,
  service,
  user,
  serviceInteractor,
  items,
}) => {
  return Promise.resolve().then(() => {
    const resourceActivites = items.map(item => {
      return createResourceActivity({
        action,
        includeDiff,
        includeSnapshot,
        item,
        requestId,
        resource,
        service,
        user,
      })
    })
    const request = {
      body: {
        data: resourceActivites,
      },
    }

    return serviceInteractor
      .call({
        operationId: 'resourceActivityBulkCreate',
        request,
      })
      .catch(err => {
        log.err(err.stack)
      })
  })
}
