const createLog = require('../../utilities/log')

const log = createLog('statistics')

module.exports = function initializeStatistics({ config }) {
  if (config.env.isDevelopment) {
    const memwatch = require('memwatch-next') // eslint-disable-line
    memwatch.on('stats', stats => {
      log.info('stats', stats)
    })
  }
}
