module.exports = function createMockDataFromSchema({
  importFaker,
  models,
  schema,
}) {
  return importFaker().then(jsf => {
    const modelsToUse = Object.keys(models).map(moduleKey => {
      return models[moduleKey]
    })
    const mock = jsf(schema, modelsToUse)
    return mock
  })
}
