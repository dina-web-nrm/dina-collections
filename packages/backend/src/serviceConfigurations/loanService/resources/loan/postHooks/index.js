const {
  createRegisterResourceActivityHook,
} = require('../../../../historyService/serviceInteractions')

exports.create = [
  createRegisterResourceActivityHook({
    action: 'create',
    service: 'loanService',
  }),
]

exports.update = [
  createRegisterResourceActivityHook({
    action: 'update',
    service: 'loanService',
  }),
]

exports.updateInternalRelationship = [
  createRegisterResourceActivityHook({
    action: 'update',
    getIdFromPath: true,
    service: 'loanService',
  }),
]

exports.del = [
  createRegisterResourceActivityHook({
    action: 'delete',
    service: 'loanService',
  }),
]
