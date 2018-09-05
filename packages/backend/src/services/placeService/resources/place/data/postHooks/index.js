const createRegisterResourceActivityHook = require('../../../../../../lib/data/hooks/factories/createRegisterResourceActivityHook')

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
