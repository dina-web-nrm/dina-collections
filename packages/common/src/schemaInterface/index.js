const singletons = require('./singletons')
const createSchemaInterface = require('./createSchemaInterface')
const apiInfo = require('../../dist/schemas/apiVersions/current/info.json')
const modelInfo = require('../../dist/schemas/modelVersions/current/info.json')
const models = require('../../dist/schemas/modelVersions/current/models.json')
const normalizedModels = require('../../dist/schemas/modelVersions/current/normalizedModels.json')
const openApiSpec = require('../../dist/schemas/apiVersions/current/openApi.json')

singletons.set({
  apiInfo,
  modelInfo,
  models,
  normalizedModels,
  openApiSpec,
})

module.exports = createSchemaInterface(singletons)
