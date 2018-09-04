const memwatch = require('memwatch-next')
const createLog = require('../../utilities/log')

const log = createLog('statistics')

module.exports = function initializeStatistics() {
  memwatch.on('stats', stats => {
    log.info('stats', stats)
  })
}
