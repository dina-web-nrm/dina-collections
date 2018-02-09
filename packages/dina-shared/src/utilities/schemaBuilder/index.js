const path = require('path')
const read = require('./read')
const write = require('./write')
const build = require('./build')

function main({ modelBasePath, apiBasePath }) {
  const { apis, endpoints, errors, info, models, parameters, security } = read({
    apiBasePath,
    modelBasePath,
  })
  const { cleanModels, openApi, swagger } = build({
    apis,
    endpoints,
    errors,
    info,
    models,
    parameters,
    security,
  })

  write({
    models: cleanModels,
    openApi,
    setCurrent: true,
    swagger,
    version: '0.1.0',
  })

  write({
    models: cleanModels,
    openApi,
    swagger,
  })
}

main({
  apiBasePath: path.join(
    __dirname,
    '../../../../dina-collections-api/src/server'
  ),
  modelBasePath: path.join(
    __dirname,
    '../../../../dina-schema/src/specification/models'
  ),
})
