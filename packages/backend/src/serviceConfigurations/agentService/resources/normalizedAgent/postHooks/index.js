const {
  createUpdateRelatedSearchSpecimensPostHook,
} = require('../../../../specimenService/serviceInteractions')

const {
  createRegisterResourceActivityHook,
} = require('../../../../historyService/serviceInteractions')

const {
  createIndexJob,
  rebuildInProgress,
} = require('../../../serviceInteractions')

const { createIndexHook } = require('../../../../../lib/data/hooks')

const indexHook = createIndexHook({
  createIndexJob,
  rebuildInProgress,
  resource: 'searchNormalizedAgent',
})

exports.create = [
  indexHook,
  createRegisterResourceActivityHook({
    action: 'create',
    service: 'agentService',
  }),
]

exports.update = [
  indexHook,
  createRegisterResourceActivityHook({
    action: 'update',
    service: 'agentService',
  }),
  createUpdateRelatedSearchSpecimensPostHook({
    resource: 'normalizedAgent',
  }),
]

exports.del = [
  indexHook,
  createRegisterResourceActivityHook({
    action: 'delete',
    service: 'agentService',
  }),
]
