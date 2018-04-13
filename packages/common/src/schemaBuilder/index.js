const path = require('path')
const read = require('./read')
const write = require('./write')
const build = require('./build')

function main({ modelBasePath, apiBasePath, normalize }) {
  const version = '0.1.0'
  const {
    apis,
    endpoints,
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
  const { cleanModels, openApi } = build({
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
    models: cleanModels,
    normalize,
    openApi,
    setCurrent: true,
    version,
  })

  write({
    models: cleanModels,
    normalize,
    openApi,
  })
}

main({
  apiBasePath: path.join(__dirname, '../../../backend/src'),
  modelBasePath: path.join(__dirname, '../../../models/src'),
  normalize: false,
})

main({
  apiBasePath: path.join(__dirname, '../../../backend/src'),
  modelBasePath: path.join(__dirname, '../../../models/src'),
  normalize: true,
})
