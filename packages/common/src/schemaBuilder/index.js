const path = require('path')
const read = require('./read')
const write = require('./write')
const build = require('./build')

function main({ modelBasePath, apiBasePath, normalize }) {
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
  })

  write({
    models: cleanModels,
    normalize,
    openApi,
    setCurrent: true,
    version: '0.1.0',
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
