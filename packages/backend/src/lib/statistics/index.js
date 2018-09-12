const createLog = require('../../utilities/log')

const log = createLog('statistics')

module.exports = function initializeStatistics() {
  /* eslint no-constant-condition: 0 */
  if (false) {
    const memwatch = require('memwatch-next') // eslint-disable-line
    memwatch.on('stats', stats => {
      log.info('stats', stats)
    })
  }
}
