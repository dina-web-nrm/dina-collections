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

const {
  createIndexHook,
  createUpdateDescendantsPostHook,
} = require('../../../../../lib/data/hooks')

const indexHook = createIndexHook({
  createIndexJob,
  rebuildInProgress,
  resource: 'searchStorageLocation',
})

exports.create = [
  indexHook,
  createRegisterResourceActivityHook({
    action: 'create',
    service: 'storageService',
  }),
]

exports.update = [
  indexHook,
  createUpdateDescendantsPostHook({
    createIndexJob,
    limit: 50,
    srcResource: 'storageLocation',
    targetSearchResource: 'searchStorageLocation',
  }),
  createRegisterResourceActivityHook({
    action: 'update',
    service: 'storageService',
  }),
  createUpdateRelatedSearchSpecimensPostHook({
    srcResource: 'storageLocation',
  }),
]

exports.updateInternalRelationship = [
  indexHook,
  createUpdateDescendantsPostHook({
    createIndexJob,
    limit: 50,
    srcResource: 'storageLocation',
    targetSearchResource: 'searchStorageLocation',
  }),
  createRegisterResourceActivityHook({
    action: 'update',
    getIdFromPath: true,
    service: 'storageService',
  }),
]

exports.del = [
  createRegisterResourceActivityHook({
    action: 'delete',
    service: 'storageService',
  }),
]
