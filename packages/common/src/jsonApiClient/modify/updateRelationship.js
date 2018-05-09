const { Dependor } = require('../../Dependor')
const buildOperationId = require('../../buildOperationId')

const dep = new Dependor({
  buildOperationId,
})

function updateRelationship({
  openApiClient,
  relationship,
  relationKey,
  item,
}) {
  console.log('updateRelationship - item', item)
  const { id, type } = item
  const { data } = relationship
  const isArray = Array.isArray(data)
  if (isArray) {
    const operationId = buildOperationId({
      operationType: 'updateRelationHasMany',
      relationKey,
      resource: type,
    })

    return openApiClient.call(operationId, {
      body: { data },
      pathParams: {
        id,
      },
    })
  }
  const operationId = buildOperationId({
    operationType: 'updateRelationHasOne',
    relationKey,
    resource: type,
  })

  return openApiClient.call(operationId, {
    body: { data },
    pathParams: {
      id,
    },
  })

  // return Object.keys(relationships).map(relationKey => {})
}

module.exports = {
  dep,
  updateRelationship,
}
