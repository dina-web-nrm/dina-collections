const buildOperationId = require('../../buildOperationId')

module.exports = function createWithoutRelationships({ openApiClient, item }) {
  const { type } = item
  openApiClient.call(
    buildOperationId({
      operationType: 'create',
      resource: type,
    }),
    {
      body: { data: item },
    }
  )
}
