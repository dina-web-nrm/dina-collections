const { Dependor } = require('../../Dependor')
const { createWithRelationships } = require('./createWithRelationships')

const dep = new Dependor({
  createWithRelationships,
})

function create({ openApiClient, resourceType, userOptions } = {}) {
  const { body } = userOptions
  return dep.createWithRelationships({
    openApiClient,
    resource: body,
    resourceType,
  })
}

module.exports = {
  create,
  dep,
}
