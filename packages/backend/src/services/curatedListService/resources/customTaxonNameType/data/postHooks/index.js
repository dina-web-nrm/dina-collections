const createRegisterResourceActivityHook = require('../../../../../../lib/data/hooks/factories/createRegisterResourceActivityHook')

exports.create = [
  createRegisterResourceActivityHook({
    action: 'create',
    service: 'curatedListService',
  }),
]

exports.update = [
  createRegisterResourceActivityHook({
    action: 'update',
    service: 'curatedListService',
  }),
]

exports.del = [
  createRegisterResourceActivityHook({
    action: 'delete',
    service: 'curatedListService',
  }),
]
