const setupModels = require('./setupModels')
const loadSampleData = require('./loadSampleData')

module.exports = function setup(log) {
  log.debug('Setup models: start')
  return setupModels().then(models => {
    log.debug('Setup models: done')
    log.debug('Load sample data: start')
    return loadSampleData({ log, models }).then(() => {
      log.debug('Load sample data: done')
    })
  })
}
