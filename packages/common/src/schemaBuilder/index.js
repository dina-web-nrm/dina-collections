const path = require('path')
const read = require('./read')
const write = require('./write')
const build = require('./build')

function main({ modelBasePath, apiBasePath }) {
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
    parameters,
    security,
    servers,
  })

  write({
    models: cleanModels,
    openApi,
    setCurrent: true,
    version: '0.1.0',
  })

  write({
    models: cleanModels,
    openApi,
  })
}

main({
  apiBasePath: path.join(__dirname, '../../../api/src'),
  modelBasePath: path.join(__dirname, '../../../models/src'),
})
