const createDocumentModel = require('../documentModel')
const attachMethods = require('./attachMethods')

module.exports = function createViewDocumentModel({
  sequelize,
  stageName,
  validate = false,
  viewName,
}) {
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
