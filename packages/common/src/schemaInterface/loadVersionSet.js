const path = require('path')

module.exports = function loadVersionSet({ apiVersion, dataModelVersion }) {
  if (!apiVersion) {
    throw new Error('Provide apiVersion')
  }

  if (!dataModelVersion) {
    throw new Error('Provide dataModelVersion')
  }

  const basePath = path.join(__dirname, '../../dist/schemas/')
  const apiVersionBasePath = path.join(basePath, 'apiVersions', apiVersion)
  const openApiSpecPath = path.join(apiVersionBasePath, 'openApi.json')
  const apiInfoPath = path.join(apiVersionBasePath, 'info.json')

  const modelVersionBasePath = path.join(
    basePath,
    'modelVersions',
    dataModelVersion
  )

  const modelsPath = path.join(modelVersionBasePath, 'models.json')
  const normalizedModelsPath = path.join(
    modelVersionBasePath,
    'normalizedModels.json'
  )
  const modelInfoPath = path.join(modelVersionBasePath, 'info.json')

  const apiInfo = require(apiInfoPath) // eslint-disable-line
  const modelInfo = require(modelInfoPath) // eslint-disable-line
  const models = require(modelsPath) // eslint-disable-line
  const normalizedModels = require(normalizedModelsPath) // eslint-disable-line
  const openApiSpec = require(openApiSpecPath) // eslint-disable-line

  return {
    apiInfo,
    modelInfo,
    models,
    normalizedModels,
    openApiSpec,
  }
}
