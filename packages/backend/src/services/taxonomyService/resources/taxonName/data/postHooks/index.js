const {
  createUpdateRelatedSearchSpecimensPostHook,
} = require('../../../../../searchService/serviceInteractions')

const {
  createRegisterResourceActivityHook,
} = require('../../../../../historyService/serviceInteractions')

exports.create = [
  createRegisterResourceActivityHook({
    action: 'create',
    service: 'taxonomyService',
  }),
]

exports.update = [
  createRegisterResourceActivityHook({
    action: 'update',
    service: 'taxonomyService',
  }),
  createUpdateRelatedSearchSpecimensPostHook({
    resource: 'taxonName',
  }),
]

exports.del = [
  createRegisterResourceActivityHook({
    action: 'delete',
    service: 'taxonomyService',
  }),
]
