const path = require('path')
const read = require('./read')
const write = require('./write')
const createModels = require('./build/models')
const buildEndpoints = require('./build/buildEndpoints')

function buildModels({
  modelBasePath,
  apiBasePath,
  normalize,
  version = '0.1.0',
}) {
  const { endpoints: endpointsInput, models } = read({
    apiBasePath,
    modelBasePath,
  })

  const endpoints = buildEndpoints(endpointsInput)

  const cleanModels = createModels({
    endpoints,
    models,
    normalize,
    version,
  })

  write({
    models: cleanModels,
    normalize,
    setCurrent: true,
    version,
  })

  write({
    models: cleanModels,
    normalize,
  })
}

buildModels({
  apiBasePath: path.join(__dirname, '../../../backend/src'),
  modelBasePath: path.join(__dirname, '../../../models/src'),
  normalize: false,
})

buildModels({
  apiBasePath: path.join(__dirname, '../../../backend/src'),
  modelBasePath: path.join(__dirname, '../../../models/src'),
  normalize: true,
})
