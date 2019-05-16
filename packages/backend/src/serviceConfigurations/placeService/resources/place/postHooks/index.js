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
  resource: 'searchPlace',
})

exports.create = [
  indexHook,
  createRegisterResourceActivityHook({
    action: 'create',
    service: 'placeService',
  }),
]

exports.update = [
  indexHook,
  createRegisterResourceActivityHook({
    action: 'update',
    service: 'placeService',
  }),
  createUpdateRelatedSearchSpecimensPostHook({
    srcResource: 'place',
  }),
]

exports.updateInternalRelationship = [
  createRegisterResourceActivityHook({
    action: 'update',
    getIdFromPath: true,
    service: 'taxonomyService',
  }),
]

exports.del = [
  createRegisterResourceActivityHook({
    action: 'delete',
    service: 'placeService',
  }),
]
