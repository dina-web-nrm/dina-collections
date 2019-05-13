const {
  createRegisterResourceActivityHook,
} = require('../../../../historyService/serviceInteractions')

const {
  createIndexJob,
  rebuildInProgress,
} = require('../../../../specimenService/serviceInteractions')

const { createIndexHook } = require('../../../../../lib/data/hooks')

const indexHook = createIndexHook({
  createIndexJob,
  rebuildInProgress,
  resource: 'searchSpecimen',
})

exports.create = [
  indexHook,
  createRegisterResourceActivityHook({
    action: 'create',
    includeDiff: true,
    includeSnapshot: true,
    service: 'specimenService',
  }),
]

exports.update = [
  indexHook,
  createRegisterResourceActivityHook({
    action: 'update',
    includeDiff: true,
    includeSnapshot: true,
    service: 'specimenService',
  }),
]

exports.del = [
  indexHook,
  createRegisterResourceActivityHook({
    action: 'delete',
    includeDiff: true,
    includeSnapshot: true,
    service: 'specimenService',
  }),
]
