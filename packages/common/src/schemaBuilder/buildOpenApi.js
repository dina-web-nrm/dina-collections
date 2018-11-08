const path = require('path')
const read = require('./read')
const write = require('./write')
const createOpenApi = require('./build/openApi')
const buildEndpoints = require('./build/buildEndpoints')

function buildOpenApi({
  apiBasePath,
  backendPackagePath,
  modelBasePath,
  modelPackagePath,
  normalize,
}) {
  const modelVersion = require(modelPackagePath).version // eslint-disable-line
  const backendVersion = require(backendPackagePath).version // eslint-disable-line

  const apiVersion = `${modelVersion}-${backendVersion}`

  const {
    apis,
    endpoints: endpointsInput,
    errors,
    info,
    models,
    parameters,
    security,
    servers,
  } = read({
    apiBasePath,
    modelBasePath,
  })

  const endpoints = buildEndpoints(endpointsInput)

  const openApi = createOpenApi({
    apis,
    endpoints,
    errors,
    info,
    models,
    normalize,
    parameters,
    security,
    servers,
    version: apiVersion,
  })

  write({
    apiVersion,
    modelVersion,
    normalize,
    openApi,
  })
}

// buildOpenApi({
//   apiBasePath: path.join(__dirname, '../../../backend/src'),
//   modelBasePath: path.join(__dirname, '../../../models/src'),
//   normalize: false,
// })

buildOpenApi({
  apiBasePath: path.join(__dirname, '../../../backend/src'),
  backendPackagePath: path.join(__dirname, '../../../backend/package.json'),
  modelBasePath: path.join(__dirname, '../../../models/src'),
  modelPackagePath: path.join(__dirname, '../../../models/package.json'),
  normalize: true,
})
