const { Dependor } = require('../../Dependor')
const { createWithRelationships } = require('./createWithRelationships')

const dep = new Dependor({
  createWithRelationships,
})

function update({ openApiClient, resourceType, userOptions } = {}) {
  const { body, pathParams = {} } = userOptions
  return dep.createWithRelationships({
    openApiClient,
    resource: { ...body, id: pathParams.id || body.id },
    resourceType,
  })
}

module.exports = {
  dep,
  update,
}
