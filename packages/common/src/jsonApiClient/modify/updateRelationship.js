const { Dependor } = require('../../Dependor')
const buildOperationId = require('../../buildOperationId')
const { update } = require('./update')

const dep = new Dependor({
  buildOperationId,
})

function updateRelationship({ openApiClient, relationship, relationKey, resource }) {
  const promises = Object.keys(relationships).map(relationKey => {
    const operationId = buildOperationId({
      operationType: 'updateRelationHasMany',
      relationKey: relationKey
      resource: type,
    })
  })

  update({openApiClient, item})

  // return Object.keys(relationships).map(relationKey => {})
}

module.exports = {
  dep,
  updateRelationship,
}
