const setupMethods = require('./setupMethods')

module.exports = function createModel({
  loadInitialData,
  name,
  relations,
  schemaModelName: schemaModelNameInput,
  schemaVersion = '1.0.1',
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
    schemaVersion,
    validate,
  })

  return { modelType: 'inMemoryDocumentModel', name, ...methods }
}
