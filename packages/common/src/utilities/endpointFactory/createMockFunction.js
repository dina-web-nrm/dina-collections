const getModelNameFromParameter = require('./getModelNameFromParameter')

module.exports = function createMockFunction({
  // createMockDataFromSchema,
  methodSpecification,
}) {
  const response =
    methodSpecification &&
    methodSpecification.responses &&
    methodSpecification.responses['200'] &&
    methodSpecification.responses['200'].content &&
    methodSpecification.responses['200']['application/json']

  if (!response) {
    return null
  }
  const modelName = getModelNameFromParameter(response)
  // return createMockDataFromSchema()

  return () => {
    return {
      a: 444,
      modelName,
    }
  }
}
