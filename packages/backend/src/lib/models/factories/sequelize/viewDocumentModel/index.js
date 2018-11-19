const createDocumentModel = require('../documentModel')
const setupMethods = require('./setupMethods')

module.exports = function createViewDocumentModel({
  config,
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
    config,
    name: viewName,
    sequelize,
    validate,
  })

  const StageModel = createDocumentModel({
    config,
    name: stageName,
    sequelize,
    validate,
  })

  const methods = setupMethods({
    config,
    sequelize,
    StageModel,
    ViewModel,
  })
  return {
    modelType: 'sequelizeViewDocumentModel',
    name,
    ...methods,
  }
}
