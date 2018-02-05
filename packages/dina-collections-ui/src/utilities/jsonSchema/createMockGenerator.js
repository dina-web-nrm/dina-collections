const models = require('dina-schema/build/models.json')
const createMockDataFromSchema = require('./createMockDataFromSchema')

module.exports = function createMockGenerator({
  importFaker,
  model,
  schema: customSchema,
}) {
  if (model && !models[model]) {
    throw new Error(`Unknown model: ${model}`)
  }

  if (!models[model] && !customSchema) {
    throw new Error(
      'If model not provided have to provide customSchema (key schema)'
    )
  }

  if (!importFaker) {
    throw new Error(`Must provide 'importFaker' method`)
  }

  const schema = models[model] || customSchema
  return () => {
    return createMockDataFromSchema({ importFaker, models, schema })
  }
}
