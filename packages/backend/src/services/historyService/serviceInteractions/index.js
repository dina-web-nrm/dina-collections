const objectPath = require('object-path')

const formatAsTimestamp = require('common/src/date/formatAsTimestamp')
const getCurrentUTCTimestamp = require('common/src/date/getCurrentUTCTimestamp')
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
    attributes.hasSourceData = !!attributes.sourceData
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
  getIdFromBody = false,
  getIdFromPath = false,
  includeDiff = false,
  includeSnapshot = false,
}) {
  return ({
    config,
    item,
    request: requestInput,
    requestId,
    resource,
    serviceInteractor,
    user,
  }) => {
    if (config.env.isTest) {
      return Promise.resolve(true)
    }

    let resourceActivityItem = item

    if (getIdFromBody) {
      resourceActivityItem = {
        id: objectPath.get(requestInput, 'body.data.id'),
        internals: { updatedAt: getCurrentUTCTimestamp() },
      }
    }

    if (getIdFromPath) {
      resourceActivityItem = {
        id: objectPath.get(requestInput, 'pathParams.id'),
        internals: { updatedAt: getCurrentUTCTimestamp() },
      }
    }

    return Promise.resolve().then(() => {
      const resourceActivity = createResourceActivity({
        action,
        includeDiff,
        includeSnapshot,
        item: resourceActivityItem,
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
