const setupMethods = require('./setupMethods')

module.exports = function createModel({
  loadInitialData,
  name,
  relations,
  schemaModelName: schemaModelNameInput,
  inMemoryDb,
  validate = false,
}) {
  const Model = inMemoryDb.createModel(name)

  const schemaModelName = schemaModelNameInput || name

  const methods = setupMethods({
    loadInitialData,
    Model,
    relations,
    schemaModelName,
    validate,
  })

  return { modelType: 'inMemoryDocumentModel', name, ...methods }
}
