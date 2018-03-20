const getModelNameFromSchema = require('./getModelNameFromSchema')
const getSchemaFromRequestBody = require('./getSchemaFromRequestBody')

module.exports = function createBodyValidator({
  createApiClientValidator,
  methodSpecification,
}) {
  const schema = getSchemaFromRequestBody(methodSpecification.requestBody)

  if (schema) {
    const modelName = getModelNameFromSchema(schema)

    return createApiClientValidator({
      model: modelName,
      operationId: methodSpecification.operationId,
      type: 'request-body',
    })
  }

  return null
}
