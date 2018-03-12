const getModelNameFromSchema = require('./getModelNameFromSchema')
const getSchemaFromRequestBody = require('./getSchemaFromRequestBody')

module.exports = function getBodyValidator({
  createApiClientValidator,
  methodSpecification,
}) {
  const schema = getSchemaFromRequestBody(methodSpecification.requestBody)

  if (schema) {
    const modelName = getModelNameFromSchema(schema)

    return createApiClientValidator({
      model: modelName,
      type: 'request-body',
    })
  }

  return null
}
