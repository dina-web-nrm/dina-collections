const createCore = require('./utilities/createCore')
const createLog = require('../../utilities/log')
const loadVersionSet = require('common/src/schemaInterface/loadVersionSet')
const singletons = require('common/src/schemaInterface/singletons')

const log = createLog('bootstrap/serviceInteractor')

module.exports = function bootstrapServiceInteractor({
  apiVersion,
  dataModelVersion,
  env,
  serviceConfigurations,
  serviceOrder,
}) {
  if (apiVersion && dataModelVersion) {
    singletons.set(
      loadVersionSet({
        apiVersion,
        dataModelVersion,
      })
    )
  }

  log.info(`Start bootstrap core`)
  return createCore({
    env,
    log,
    serviceConfigurations,
    serviceOrder,
  }).then(({ serviceInteractor }) => {
    log.info(`Bootstrap core done`)

    return serviceInteractor
  })
}
