const createCore = require('./utilities/createCore')
const importer = require('../importer')
const createLog = require('../../utilities/log')

const log = createLog('bootstrap/data')

module.exports = function bootstrapData({
  env,
  serviceConfigurations,
  serviceOrder,
  importData = true,
  rebuildElastic = true,
}) {
  log.info(`Start bootstrap core`)
  return createCore({
    env,
    log,
    serviceConfigurations,
    serviceOrder,
  }).then(({ config, fileInteractor, serviceInteractor }) => {
    log.info(`Bootstrap core done`)

    return importer({
      config,
      fileInteractor,
      importData,
      rebuildElastic,
      serviceInteractor,
    }).then(() => {
      return null
    })
  })
}
