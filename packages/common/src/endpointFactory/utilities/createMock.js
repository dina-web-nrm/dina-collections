const createMockGenerator = require('../../jsonSchema/createMockGenerator')
const getSchemaFromResponse = require('./getSchemaFromResponse')
const getModelNameFromSchema = require('./getModelNameFromSchema')

module.exports = function createMock({ importFaker, methodSpecification }) {
  const schema = getSchemaFromResponse(
    methodSpecification.responses[200] || methodSpecification.responses[201]
  )
  if (schema) {
    const modelName = getModelNameFromSchema(schema)
    if (modelName) {
      return createMockGenerator({
        importFaker,
        model: modelName,
      })
    }
    return createMockGenerator({
      importFaker,
      schema,
    })
  }

  return null
}
