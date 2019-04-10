const createCore = require('./utilities/createCore')
const importer = require('../importer')
const createLog = require('../../utilities/log')

const log = createLog('bootstrap/data')

module.exports = function bootstrapData({
  env,
  serviceConfigurations,
  importData = true,
  rebuildElastic = true,
}) {
  log.info('bootstraping data')
  return createCore({
    env,
    log,
    serviceConfigurations,
  }).then(({ config, fileInteractor, serviceInteractor }) => {
    log.info(`Bootstrap core done`)

    return importer({
      config,
      fileInteractor,
      importData,
      rebuildElastic,
      serviceInteractor,
    }).then(() => {
      log.info('bootstraping data done')
      return null
    })
  })
}
