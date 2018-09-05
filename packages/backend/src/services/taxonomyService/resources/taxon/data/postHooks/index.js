const createRegisterResourceActivityHook = require('../../../../../../lib/data/hooks/factories/createRegisterResourceActivityHook')

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
]

exports.del = [
  createRegisterResourceActivityHook({
    action: 'delete',
    service: 'taxonomyService',
  }),
]
