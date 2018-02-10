const getModelNameFromParameter = require('./getModelNameFromParameter')

module.exports = function createBodyValidator({
  createSystemModelSchemaValidator,
  methodSpecification,
}) {
  const { parameters } = methodSpecification

  if (!parameters) {
    return null
  }

  const bodyParameter = parameters.find(parameterSpecification => {
    return parameterSpecification.in === 'body'
  })

  if (bodyParameter) {
    const modelName = getModelNameFromParameter(bodyParameter)
    return createSystemModelSchemaValidator({
      model: modelName,
      throwOnError: true,
    })
  }

  return null
}
