const attachMethods = require('./attachMethods')

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

  return attachMethods({
    loadInitialData,
    Model,
    relations,
    schemaModelName,
    schemaVersion,
    validate,
  })
}
