const createRegisterResourceActivityHook = require('../../../../../../lib/data/hooks/factories/createRegisterResourceActivityHook')

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
]

exports.del = [
  createRegisterResourceActivityHook({
    action: 'delete',
    service: 'storageService',
  }),
]
