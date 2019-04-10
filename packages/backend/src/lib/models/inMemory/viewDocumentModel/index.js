const createDocumentModel = require('../documentModel')
const setupMethods = require('./setupMethods')

module.exports = function createViewDocumentModel({
  name,
  inMemoryDb,
  stageName: stageNameInput,
  validate = false,
  viewName: viewNameInput,
}) {
  if (!name) {
    throw new Error('Name is required')
  }

  const viewName = viewNameInput || name
  const stageName = stageNameInput || `${name}Stage`

  const ViewModel = createDocumentModel({
    inMemoryDb,
    name: viewName,
    validate,
  })

  const StageModel = createDocumentModel({
    inMemoryDb,
    name: stageName,
    validate,
  })

  const methods = setupMethods({
    inMemoryDb,
    StageModel,
    ViewModel,
  })

  return {
    ...methods,
    modelType: 'inMemoryViewDocumentModel',
    name,
  }
}
