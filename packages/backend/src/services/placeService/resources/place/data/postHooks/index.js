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
]

exports.del = [
  createRegisterResourceActivityHook({
    action: 'delete',
    service: 'placeService',
  }),
]
