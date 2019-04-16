const { runImport } = require('../importer')
const createLog = require('../../utilities/log')
const { createCore } = require('./core')

const log = createLog('bootstrap/data')

module.exports = function bootstrapData({
  serviceConfigurations,
  importData = true,
  rebuildElastic = true,
}) {
  log.info('bootstraping data')
  return createCore({
    log,
    serviceConfigurations,
  }).then(({ config, fileInteractor, serviceInteractor }) => {
    log.info(`Bootstrap core done`)

    return runImport({
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
