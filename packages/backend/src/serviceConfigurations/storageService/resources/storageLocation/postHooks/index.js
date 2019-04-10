const {
  createUpdateRelatedSearchSpecimensPostHook,
} = require('../../../../searchService/serviceInteractions')

const {
  createRegisterResourceActivityHook,
} = require('../../../../historyService/serviceInteractions')

exports.create = [
  createRegisterResourceActivityHook({
    action: 'create',
    service: 'storageService',
  }),
]

exports.update = [
  createRegisterResourceActivityHook({
    action: 'update',
    service: 'storageService',
  }),
  createUpdateRelatedSearchSpecimensPostHook({
    resource: 'storageLocation',
  }),
]

exports.updateInternalRelationship = [
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
