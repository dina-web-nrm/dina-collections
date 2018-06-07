const createDocumentModel = require('../documentModel')
const attachMethods = require('./attachMethods')

module.exports = function createViewDocumentModel({
  name,
  sequelize,
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
    name: viewName,
    sequelize,
    validate,
  })

  const StageModel = createDocumentModel({
    name: stageName,
    sequelize,
    validate,
  })

  return attachMethods({
    sequelize,
    StageModel,
    ViewModel,
  })
}
