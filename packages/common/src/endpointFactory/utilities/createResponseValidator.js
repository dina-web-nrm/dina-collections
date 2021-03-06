const getSchemaFromResponse = require('./getSchemaFromResponse')
const getModelNameFromSchema = require('./getModelNameFromSchema')

module.exports = function createResponseValidator({
  createApiClientValidator,
  methodSpecification,
}) {
  const schema = getSchemaFromResponse(
    methodSpecification.responses[200] || methodSpecification.responses[201]
  )
  if (schema) {
    const modelName = getModelNameFromSchema(schema)
    return createApiClientValidator({
      model: modelName,
      operationId: methodSpecification.operationId,
      schema,
      type: 'response',
    })
  }

  return null
}
