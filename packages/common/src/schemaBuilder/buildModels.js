const path = require('path')
const read = require('./read')
const write = require('./write')
const createModels = require('./build/models')
const buildEndpoints = require('./build/buildEndpoints')

function buildModels({
  apiBasePath,
  modelBasePath,
  modelPackagePath,
  normalize,
}) {
  const modelVersion = require(modelPackagePath).version // eslint-disable-line

  const { endpoints: endpointsInput, models } = read({
    apiBasePath,
    modelBasePath,
  })

  const endpoints = buildEndpoints(endpointsInput)

  const cleanModels = createModels({
    endpoints,
    models,
    normalize,
    version: modelVersion,
  })

  write({
    models: cleanModels,
    modelVersion,
    normalize,
  })
}

buildModels({
  apiBasePath: path.join(__dirname, '../../../backend/src'),
  modelBasePath: path.join(__dirname, '../../../models/src'),
  modelPackagePath: path.join(__dirname, '../../../models/package.json'),
  normalize: false,
})

buildModels({
  apiBasePath: path.join(__dirname, '../../../backend/src'),
  modelBasePath: path.join(__dirname, '../../../models/src'),
  modelPackagePath: path.join(__dirname, '../../../models/package.json'),
  normalize: true,
})
