const buildOperationId = require('../../buildOperationId')

module.exports = function createWithoutRelationships({ openApiClient, item }) {
  const { id, type } = item
  openApiClient.call(
    buildOperationId({
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
