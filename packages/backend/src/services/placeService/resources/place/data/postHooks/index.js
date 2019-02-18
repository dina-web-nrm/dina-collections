const {
  createUpdateRelatedSearchSpecimensPostHook,
} = require('../../../../../searchService/serviceInteractions')

const {
  createRegisterResourceActivityHook,
} = require('../../../../../historyService/serviceInteractions')

exports.create = [
  createRegisterResourceActivityHook({
    action: 'create',
    service: 'placeService',
  }),
]

exports.update = [
  createRegisterResourceActivityHook({
    action: 'update',
    service: 'placeService',
  }),
  createUpdateRelatedSearchSpecimensPostHook({
    resource: 'place',
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
