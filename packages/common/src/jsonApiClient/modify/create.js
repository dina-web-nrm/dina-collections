const { Dependor } = require('../../Dependor')
const buildOperationId = require('../../buildOperationId')

const dep = new Dependor({
  buildOperationId,
})

function create({ openApiClient, item }) {
  const { type } = item
  return openApiClient.call(
    dep.buildOperationId({
      operationType: 'create',
      resource: type,
    }),
    {
      body: { data: item },
    }
  )
}

module.exports = {
  create,
  dep,
}
