const { Dependor } = require('../../Dependor')

const buildOperationId = require('../../buildOperationId')

const dep = new Dependor({
  buildOperationId,
})

function update({ openApiClient, item }) {
  const { id, type } = item
  if (!item.attributes) {
    return Promise.resolve({ data: item })
  }

  return openApiClient.call(
    dep.buildOperationId({
      operationType: 'update',
      resource: type,
    }),
    {
      body: { data: item },
      pathParams: {
        id,
      },
    }
  )
}

module.exports = {
  dep,
  update,
}
