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
  const { id, internals, meta } = item
  const attributes = {
    action,
    requestId,
    resource,
    resourceId: id,
    service,
    userId: user && user.id,
    username: user && user.name,
  }

  if (meta && meta.sourceData) {
    attributes.sourceData = meta.sourceData
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
  return ({ config, item, requestId, resource, serviceInteractor, user }) => {
    if (config.env.isTest) {
      return Promise.resolve(true)
    }

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
        .call({
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
