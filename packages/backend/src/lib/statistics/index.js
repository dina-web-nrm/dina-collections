/* eslint-disable no-console */
const createLog = require('../../utilities/log')

const log = createLog('statistics')

module.exports = function initializeStatistics({ config }) {
  /* eslint no-constant-condition: 0 */

  if (config && config.test && config.test.runMemwatch) {
    let memwatch
    try {
      memwatch = require('memwatch-next') // eslint-disable-line
    } catch (err) {
      console.log(
        'Failed require memwatch-next. Has to be installed manually with `npm install memwatch-next`'
      )
      throw err
    }

    memwatch.on('stats', stats => {
      log.info('stats', stats)
    })
  }
}
