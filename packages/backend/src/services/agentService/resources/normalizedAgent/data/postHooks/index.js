const {
  createUpdateRelatedSearchSpecimensPostHook,
} = require('../../../../../searchService/serviceInteractions')

const {
  createRegisterResourceActivityHook,
} = require('../../../../../historyService/serviceInteractions')

exports.create = [
  createRegisterResourceActivityHook({
    action: 'create',
    service: 'agentService',
  }),
]

exports.update = [
  createRegisterResourceActivityHook({
    action: 'update',
    service: 'agentService',
  }),
  createUpdateRelatedSearchSpecimensPostHook({
    resource: 'normalizedAgent',
  }),
]

exports.del = [
  createRegisterResourceActivityHook({
    action: 'delete',
    service: 'agentService',
  }),
]
