const getSchemaFromResponse = require('./getSchemaFromResponse')
const getModelNameFromSchema = require('./getModelNameFromSchema')

module.exports = function getExamplesFromMethodSpecifiction({
  methodSpecification,
  openApiSpec,
}) {
  const schema = getSchemaFromResponse(
    methodSpecification.responses[200] || methodSpecification.responses[201]
  )
  if (!schema) {
    return null
  }

  const modelName = getModelNameFromSchema(schema)
  if (!modelName) {
    return null
  }

  return (
    openApiSpec &&
    openApiSpec.components &&
    openApiSpec.components.schemas &&
    openApiSpec.components.schemas[modelName] &&
    openApiSpec.components.schemas[modelName]['x-examples']
  )
}
