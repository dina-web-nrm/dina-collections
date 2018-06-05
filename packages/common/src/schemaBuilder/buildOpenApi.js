const path = require('path')
const read = require('./read')
const write = require('./write')
const createOpenApi = require('./build/openApi')
const buildEndpoints = require('./build/buildEndpoints')

function buildOpenApi({
  modelBasePath,
  apiBasePath,
  normalize,
  version = '0.1.0',
}) {
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
    version,
  })

  write({
    normalize,
    openApi,
    setCurrent: true,
    version,
  })

  write({
    normalize,
    openApi,
  })
}

buildOpenApi({
  apiBasePath: path.join(__dirname, '../../../backend/src'),
  modelBasePath: path.join(__dirname, '../../../models/src'),
  normalize: false,
})

buildOpenApi({
  apiBasePath: path.join(__dirname, '../../../backend/src'),
  modelBasePath: path.join(__dirname, '../../../models/src'),
  normalize: true,
})
