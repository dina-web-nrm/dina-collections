const createLog = require('../../utilities/log')
const loadVersionSet = require('common/src/schemaInterface/loadVersionSet')
const singletons = require('common/src/schemaInterface/singletons')
const { createCore } = require('./core')

const log = createLog('bootstrap/serviceInteractor')

module.exports = function bootstrapServiceInteractor({
  apiVersion,
  dataModelVersion,
  env,
  serviceConfigurations,
}) {
  log.info('bootstraping service interactor')
  if (apiVersion && dataModelVersion) {
    singletons.set(
      loadVersionSet({
        apiVersion,
        dataModelVersion,
      })
    )
  }

  return createCore({
    env,
    log,
    serviceConfigurations,
  }).then(({ serviceInteractor }) => {
    log.info('bootstraping service interactor done')

    return serviceInteractor
  })
}
