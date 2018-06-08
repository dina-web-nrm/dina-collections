const createDocumentModel = require('../documentModel')
const attachMethods = require('./attachMethods')

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

  return attachMethods({
    inMemoryDb,
    StageModel,
    ViewModel,
  })
}
